export interface HttpResponse<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  status: number;
  title: string;
  message: string;
  response?: T;
}

export interface ToolboxConfiguration {
  baseUrl: string;
  clientId: string;
  secret: string;
}

export interface ToolboxLoginResponse {
  token_type?: string;
  access_token?: string;
  issued_at?: number;
  expires_in?: number;
  scope?: string;
}
