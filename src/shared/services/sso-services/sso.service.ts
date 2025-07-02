import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  AmicarSso,
  SsoLoginResponse,
  TokenValidationResponse,
} from './interfaces/amicar-sso.interface';

@Injectable()
export class SsoService {
  constructor(private readonly configService: ConfigService) {}

  getAxios() {
    const amicarSso = this.configService.get<AmicarSso>('amicarSso')!;
    const { url } = amicarSso;
    return axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: url,
    });
  }

  async login(code: string): Promise<SsoLoginResponse> {
    const amicarSso = this.configService.get<AmicarSso>('amicarSso')!;
    const { clientId, clientSecret, codeLoginUrl } = amicarSso;

    const axiosInstance = this.getAxios();
    const body = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
    };

    const { data } = await axiosInstance.post<SsoLoginResponse>(
      codeLoginUrl,
      body,
    );

    return data;
  }

  async validateToken(token: string): Promise<TokenValidationResponse> {
    const amicarSso = this.configService.get<AmicarSso>('amicarSso')!;
    const { tokenValidation, clientId, clientSecret } = amicarSso;

    const axiosInstance = this.getAxios();
    const body = {
      token,
      client_id: clientId,
      client_secret: clientSecret,
    };

    const { data } = await axiosInstance.post<TokenValidationResponse>(
      tokenValidation,
      body,
    );

    return data;
  }
}
