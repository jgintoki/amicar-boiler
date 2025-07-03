export interface AmicarSso {
  url: string;
  clientId: string;
  clientSecret: string;
  codeLoginUrl: string;
  tokenValidation: string;
}

export interface BaseResponse {
  status: number;
  message: string;
  timestamp: Date;
  uuid: string;
}

export interface LoginResult {
  username: string;
  rut: string;
  name: string;
  email: string;
  memberOf: string[];
  userAccountControl: number;
  token: string;
  tokenTimestamp: string;
}

export interface SsoLoginResponse extends BaseResponse {
  result: LoginResult;
}

export interface TokenValidationResponse extends BaseResponse {
  result: string;
}
