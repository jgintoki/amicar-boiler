import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { UsersService } from './services/users-create.service';
import { UserCreateRepository } from './repositories/user-create.repository';

@Module({
  imports: [],
  providers: [PrismaService, UserCreateRepository, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
