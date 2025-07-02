import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { UsersCreateService } from './services/users-create.service';
import { UserCreateRepository } from './repositories/user-create.repository';
import { UserFindOneService } from './services/user-find-one.service';
import { UserFindOneRepository } from './repositories/user-find-one-repository';
import { UserFindOrCreateService } from './services/user-find-or-create.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    UserCreateRepository,
    UsersCreateService,
    UserFindOneService,
    UserFindOneRepository,
    UserFindOrCreateService,
  ],
  exports: [UsersCreateService, UserFindOneService, UserFindOrCreateService],
  controllers: [UsersController],
})
export class UsersModule {}
