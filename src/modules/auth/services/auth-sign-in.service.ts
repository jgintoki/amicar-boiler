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

    console.log(ssoResponse);
    if (!ssoResponse || !ssoResponse.result) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // const user = await this.usersService.findOneOrCreate(username, {
    //   ...result,
    //   memberOf: memberOf.join(',').slice(0, 200),
    // });

    // const detectedProfile = (user.memberOf.toUpperCase() || '')
    //   ?.split('AMISIGN_')[1]
    //   ?.split(',')[0];

    // const payload = {
    //   username: user.username,
    //   sub: user.id,
    //   name: user.name,
    //   email: user.email,
    //   rut: user.rut,
    //   roles: [detectedProfile],
    // };

    // await this.userActionService.createUserAction(user.name, 'SIGN_IN', {
    //   user: payload,
    // } as any);

    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };

    return ssoResponse.result;
  }
}
