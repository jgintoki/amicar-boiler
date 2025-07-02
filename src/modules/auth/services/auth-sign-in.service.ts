import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSignInDto } from '../dtos/auth-sign-in.dto';
import { LoginResult } from '../../../shared/services/sso-services/interfaces/amicar-sso.interface';
import { SsoService } from 'src/shared/services/sso-services/sso.service';

@Injectable()
export class AuthSignInService {
  constructor(private readonly ssoService: SsoService) {}

  async execute(authSignInDto: AuthSignInDto): Promise<LoginResult> {
    const { code } = authSignInDto;
    const ssoResponse = await this.ssoService.login(code);

    if (!ssoResponse || !ssoResponse.result) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return ssoResponse.result;
  }
}
