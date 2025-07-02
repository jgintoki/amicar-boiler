import { Injectable } from '@nestjs/common';
import { DefaultLogger } from 'src/shared/helpers/default-logger.helper';
import { httpErrorResponse } from 'src/shared/helpers/http-responses.helper';
import { UserFindOneRepository } from '../repositories/user-find-one-repository';
import { UserPrimitive } from 'src/shared/entitites/user.entity';

@Injectable()
export class UserFindOneService {
  private logger = new DefaultLogger(UserFindOneService.name);

  constructor(private readonly repository: UserFindOneRepository) {}

  async execute(params: Partial<UserPrimitive>): Promise<UserPrimitive> {
    const user = await this.repository.execute({
      ...params,
    });

    if (!user) {
      return httpErrorResponse({
        message: 'User not found',
        statusCode: 404,
      });
    }

    return user;
  }
}
