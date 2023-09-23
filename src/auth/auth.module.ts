import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtStrategy } from 'src/guards/jwt-strategy.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { DatabaseModule } from 'src/database/database.module';
import { profileProviders, userProviders } from './auth.provider';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: 'sekretKey',
      signOptions: { algorithm: 'HS512', expiresIn: '1d' },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [
    AuthService,
    RolesGuard,
    JwtStrategy,
    JwtAuthGuard,
    ...userProviders,
    ...profileProviders,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
