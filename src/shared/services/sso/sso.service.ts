import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AmicarSso, SsoLoginResponse } from './interfaces/amicar-sso.interface';
import { FetchService } from '../fetch/fetch.service';

@Injectable()
export class SsoService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fetchService: FetchService,
  ) {}

  async login(code: string): Promise<SsoLoginResponse> {
    const amicarSso = this.configService.get<AmicarSso>('amicarSso')!;
    const { url, clientId, clientSecret, codeLoginUrl } = amicarSso;

    const body = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
    };

    const { data } = await this.fetchService.send<SsoLoginResponse>({
      url: `${url}${codeLoginUrl}`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    return data;
  }
}
