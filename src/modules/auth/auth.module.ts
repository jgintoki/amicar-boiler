import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthSignInService } from './services/auth-sign-in.service';
import { AuthSignOutService } from './services/auth-sign-out.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { SsoService } from 'src/shared/services/sso/sso.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ConfigModule, PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthGuard, AuthSignInService, AuthSignOutService, SsoService],
  exports: [AuthSignInService, AuthSignOutService],
})
export class AuthModule {}
