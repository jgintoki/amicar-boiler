import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFindOneService } from './services/user-find-one.service';
import { UsersCreateService } from './services/users-create.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersCreateService: UsersCreateService,
    private readonly userFindOneService: UserFindOneService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersCreateService.execute(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userFindOneService.execute({ id });
  }

  @UseGuards(AuthGuard)
  @Get(':id/protected')
  async findOneGuard(@Param('id', ParseIntPipe) id: number) {
    return this.userFindOneService.execute({ id });
  }
}
