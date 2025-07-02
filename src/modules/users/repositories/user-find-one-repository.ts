import { Injectable } from '@nestjs/common';
import { UserPrimitive } from 'src/shared/entitites/user';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Injectable()
export class UserFindOneRepositoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: number): Promise<UserPrimitive | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }
}
