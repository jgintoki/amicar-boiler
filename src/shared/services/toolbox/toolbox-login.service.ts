import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ToolboxConfiguration,
  ToolboxLoginResponse,
} from './toolbox.interfaces';
import { DefaultLogger } from 'src/shared/helpers/default-logger.helper';
import { FetchService } from '../fetch/fetch.service';

@Injectable()
export class ToolboxLoginService {
  private readonly logger = new DefaultLogger(ToolboxLoginService.name);
  private data: ToolboxLoginResponse;

  constructor(
    private readonly configService: ConfigService,
    private readonly fetchService: FetchService,
  ) {}

  async execute(): Promise<ToolboxLoginResponse> {
    const config = this.configService.get<ToolboxConfiguration>('toolbox')!;
    const { baseUrl, clientId, secret } = config;

    if (this.hasValidSession()) {
      return this.data;
    }

    const response = await this.fetchService.send<ToolboxLoginResponse>({
      url: `${baseUrl}/signin/accesstoken`,
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: secret,
      },
    });

    if (!response.data || !response.data.access_token) {
      throw new Error('Error while trying to login - No access token received');
    }

    this.data = response.data;

    return response.data;
  }

  private hasValidSession(): boolean {
    const session = Boolean(
      this.data && this.data.expires_in && this.data.expires_in > Date.now(),
    );

    if (session) {
      this.logger.log(`Session is still valid`);
    }

    return session;
  }
}
