import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.credentials.dto';
import { SignInCredentialsDto } from './dto/signIn.credentials.dto';
import { Request, Response } from 'express';
import { UpdateUserDto } from './dto/updateUser.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.type';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/signin')
  signin(
    @Body() signInCredentialsDto: SignInCredentialsDto,
    @Res() res: Response,
  ) {
    return this.userService.signin(signInCredentialsDto, res);
  }

  @Patch('/update')
  @UseGuards(AuthGuard())
  update(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser()
    user: User,
  ) {
    return this.userService.updateUser(updateUserDto, user.email);
  }

  @Get('/details')
  @UseGuards(AuthGuard())
  getUser(@GetUser() user: User) {
    return this.userService.getUserDetails(user);
  }

  @Delete('/logout')
  @UseGuards(AuthGuard())
  logout(@Res() res: Response) {
    return this.userService.logout(res);
  }
}
