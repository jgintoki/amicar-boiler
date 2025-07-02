import { Injectable } from '@nestjs/common';
import { UserPrimitive } from 'src/shared/entitites/user.entity';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Injectable()
export class UserFindOneRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(params: Partial<UserPrimitive>): Promise<UserPrimitive | null> {
    return this.prismaService.user.findFirst({
      where: { ...params },
    });
  }
}
