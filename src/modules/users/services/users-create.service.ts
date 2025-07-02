import { Injectable } from '@nestjs/common';
import { UserCreateRepository } from '../repositories/user-create.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserPrimitive } from 'src/shared/entitites/user';
import { httpErrorResponse } from 'src/shared/helpers/http-responses.helper';
import { DefaultLogger } from 'src/shared/helpers/default-logger.helper';

@Injectable()
export class UsersCreateService {
  private readonly logger = new DefaultLogger(UsersCreateService.name);

  constructor(private repository: UserCreateRepository) {}

  async execute(data: CreateUserDto): Promise<UserPrimitive> {
    try {
      const user = await this.repository.execute(data);

      return user;
    } catch (error: unknown) {
      this.logger.error({
        message: 'Error creating user',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return httpErrorResponse({
        message: 'Error creating user',
        statusCode: 500,
      });
    }
  }
}
