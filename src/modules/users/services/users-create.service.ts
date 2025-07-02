import { Injectable } from '@nestjs/common';
import { UserCreateRepository } from '../repositories/user-create.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserPrimitive } from 'src/shared/entitites/user.entity';
import { httpSuccessResponse } from 'src/shared/helpers/http-responses.helper';
import { DefaultLogger } from 'src/shared/helpers/default-logger.helper';
import { HttpResponse } from 'src/shared/types/commons.interface';
import { UserFindOneService } from './user-find-one.service';

@Injectable()
export class UsersCreateService {
  private readonly logger = new DefaultLogger(UsersCreateService.name);

  constructor(
    private readonly repository: UserCreateRepository,
    private readonly find: UserFindOneService,
  ) {}

  async execute(
    data: CreateUserDto,
  ): Promise<HttpResponse<{ user: UserPrimitive }>> {
    let user = await this.find.execute({ email: data.email });

    if (!user) {
      user = await this.repository.execute(data);
    }

    return httpSuccessResponse({
      statusCode: 201,
      message: 'User created successfully',
      data: { user },
    });
  }
}
