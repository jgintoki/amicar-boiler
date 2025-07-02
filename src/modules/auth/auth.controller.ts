import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthSignOutService } from './services/auth-sign-out.service';
import { AuthSignInService } from './services/auth-sign-in.service';
import { AuthSignInDto } from './dtos/auth-sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInService: AuthSignInService,
    private readonly signOutService: AuthSignOutService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: AuthSignInDto) {
    return this.signInService.execute(signInDto);
  }

  // @UseGuards(AuthGuard)
  // @Post('signout')
  // signOut(@Request() req) {
  //   return this.signOutService.execute(req.user);
  // }
}
