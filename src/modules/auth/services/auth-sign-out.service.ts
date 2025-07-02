import { Injectable } from '@nestjs/common';
import { AuthSignInDto } from '../dtos/auth-sign-in.dto';

@Injectable()
export class AuthSignOutService {
  constructor() {}

  async execute(params: AuthSignInDto): Promise<void> {}
}
