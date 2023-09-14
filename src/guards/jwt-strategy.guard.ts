import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { CustomRequest } from 'src/auth/interface/custom-request.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'sekretKey',
      passReqToCallback: true,
    });
  }

  async validate(request: CustomRequest, payload: any) {
    request.user = payload;
    return payload;
  }
}
