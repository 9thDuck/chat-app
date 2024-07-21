import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.type';
import { USER_MODEL } from 'src/constants';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.credentials.dto';
import { GenericSuccessResPayload } from 'src/types';
import { getSuccessResObj } from 'src/utils';
import { SignInCredentialsDto } from './dto/signIn.credentials.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtPayload } from './jwt.payload.types';
import { cookieOptions } from './constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL) private readonly usersModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<GenericSuccessResPayload> {
    try {
      const { username, password, name, email } = createUserDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await new this.usersModel({
        username,
        password: hashedPassword,
        name,
        email,
      }).save();

      return getSuccessResObj();
    } catch (err) {
      if (err.code === 'E11000') {
        throw new ConflictException(`Username / email is already taken`);
      }
      console.log(err.toString());
      throw new InternalServerErrorException();
    }
  }

  async signin(signInCredentialsDto: SignInCredentialsDto, res: Response) {
    try {
      const { email, password } = signInCredentialsDto;

      const [foundUser] = await this.usersModel.find({ email });

      if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
        throw new UnauthorizedException('Please check your login credentials');
      }

      const payload = { username: foundUser.username, email };
      const accessToken = this.jwtService.sign(payload);

      res.cookie('accessToken', accessToken, cookieOptions);

      return res.json(getSuccessResObj('Signed in successfully'));
    } catch (error) {
      console.log(error.toString());
      throw new InternalServerErrorException();
    }
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    email: string,
  ): Promise<GenericSuccessResPayload> {
    try {
      const { name, profilePic } = updateUserDto;
      await this.usersModel.findOneAndUpdate(
        { email },
        { name, profile_pic: profilePic },
      );

      return getSuccessResObj();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getUserDetails({ email }: JwtPayload) {
    try {
      const user = await this.usersModel
        .findOne({ email })
        .select('-password -profile_pic -_id -__v');
      console.log(user);
      return getSuccessResObj(undefined, { user });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async logout(res: Response) {
    try {
      return res
        .cookie('accessToken', '', cookieOptions)
        .status(HttpStatus.OK)
        .json(getSuccessResObj());
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
