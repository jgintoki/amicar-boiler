/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    // Es seguro dejar esto si quieres un cierre explícito cuando el módulo de Nest se destruya.
    // Si esta línea sigue causando ADVERTENCIAS al cerrar, puedes comentarla,
    // ya que Prisma suele manejar su desconexión internamente.
    await this.$disconnect();
  }
}
