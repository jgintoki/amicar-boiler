import { Injectable } from '@nestjs/common';
import { UserPrimitive } from 'src/shared/entitites/user';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Injectable()
export class UserCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(data: UserPrimitive) {
    return this.prismaService.user.create({
      data,
    });
  }
}
