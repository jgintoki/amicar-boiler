import { Injectable } from '@nestjs/common';
import { UserFindOneRepository } from '../repositories/user-find-one-repository';
import { UserCreateRepository } from '../repositories/user-create.repository';
import { UserPrimitive } from 'src/shared/entitites/user.entity';

@Injectable()
export class UserFindOrCreateService {
  constructor(
    private readonly userFindOneRepository: UserFindOneRepository,
    private readonly userCreateRepository: UserCreateRepository,
  ) {}

  async execute(data: UserPrimitive) {
    const existingUser = await this.userFindOneRepository.execute({
      email: data.email,
    });

    if (existingUser) {
      return existingUser;
    }

    return this.userCreateRepository.execute(data);
  }
}
