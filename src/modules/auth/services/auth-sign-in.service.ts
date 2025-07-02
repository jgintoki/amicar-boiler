import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSignInDto } from '../dtos/auth-sign-in.dto';
import { SsoService } from 'src/shared/services/sso-services/sso.service';
import { UserFindOrCreateService } from 'src/modules/users/services/user-find-or-create.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthSignInService {
  constructor(
    private readonly ssoService: SsoService,
    private readonly userFindOrCreateService: UserFindOrCreateService,
    private jwtService: JwtService,
  ) {}

  async execute(
    authSignInDto: AuthSignInDto,
  ): Promise<{ access_token: string }> {
    const { code } = authSignInDto;
    const ssoResponse = await this.ssoService.login(code);

    if (!ssoResponse || !ssoResponse.result) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.userFindOrCreateService.execute({
      email: ssoResponse.result.email,
      username: ssoResponse.result.username,
      name: ssoResponse.result.name,
      rut: ssoResponse.result.rut,
    });

    const payload = {
      sub: user.id,
      name: user.username,
      email: user.email,
      roles: [],
    };

    const jwsToken = await this.jwtService.signAsync(payload);

    return {
      access_token: jwsToken,
    };
  }
}
