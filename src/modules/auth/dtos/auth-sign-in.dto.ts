import { IsString } from 'class-validator';

export class AuthSignInDto {
  @IsString({ message: 'Code must be a string' })
  code: string;
}
