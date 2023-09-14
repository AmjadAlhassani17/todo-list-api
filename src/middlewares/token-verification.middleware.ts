import {
  HttpException,
  Injectable,
  NestMiddleware,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomRequest } from 'src/auth/interface/custom-request.interface';

@Injectable()
export class TokenVerificationMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: CustomRequest, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req.user = decoded;
      } catch (error) {
        throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
      }
    }

    next();
  }
}
