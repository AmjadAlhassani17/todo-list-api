import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthEntity } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtStrategy } from 'src/guards/jwt-strategy.guard';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenVerificationMiddleware } from 'src/middlewares/token-verification.middleware';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([AuthEntity]),
    JwtModule.register({
      global: true,
      secret: 'sekretKey',
      signOptions: { algorithm: 'HS512', expiresIn: '1d' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [AuthService, RolesGuard, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenVerificationMiddleware).forRoutes('auth/vi/updateUser');
    consumer.apply(TokenVerificationMiddleware).forRoutes('auth/vi/deleteUser');
  }
}
