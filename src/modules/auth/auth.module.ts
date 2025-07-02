import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthSignInService } from './services/auth-sign-in.service';
import { AuthSignOutService } from './services/auth-sign-out.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SsoService } from 'src/shared/services/sso-services/sso.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthGuard,
    AuthSignInService,
    AuthSignOutService,
    SsoService,
  ],
  exports: [AuthSignInService, AuthSignOutService],
})
export class AuthModule {}
