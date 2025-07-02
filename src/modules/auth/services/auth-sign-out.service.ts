import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthSignOutService {
  constructor(private readonly jwtService: JwtService) {}

  async execute(): Promise<{ message: string }> {
    await this.jwtService.signAsync({}, { expiresIn: 0 });

    return { message: 'Sign out' };
  }
}
