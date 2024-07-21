import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model } from 'mongoose';
import { USER_MODEL } from 'src/constants';
import { User } from './user.type';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt.payload.types';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(USER_MODEL)
    private userModel: Model<User>,
    private readonly env: ConfigService,
  ) {
    super({
      secretOrKey: env.get('SERVER_SECRET'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
    });
  }
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies?.accessToken) {
      return req.cookies.accessToken;
    }
    return null;
  }
}
