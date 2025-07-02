import { Injectable } from '@nestjs/common';
import { UserPrimitive } from 'src/shared/entitites/user';
import { UserFindOneRepositoryService } from '../repositories/user-find-one-repository';
import { DefaultLogger } from 'src/shared/helpers/default-logger.helper';
import { httpErrorResponse } from 'src/shared/helpers/http-responses.helper';
@Injectable()
export class UserFindOneService {
  private logger = new DefaultLogger(UserFindOneService.name);

  constructor(
    private readonly userFindOneRepository: UserFindOneRepositoryService,
  ) {}

  async execute(id: number): Promise<UserPrimitive> {
    try {
      const user = await this.userFindOneRepository.execute(id);

      if (!user) {
        return httpErrorResponse({
          statusCode: 404,
          message: 'User not found',
        });
      }

      return user;
    } catch (error: unknown) {
      this.logger.error({
        message: (error as Error).message,
        stack: (error as Error).stack,
      });

      throw new Error('Error finding user');
    }
  }
}
