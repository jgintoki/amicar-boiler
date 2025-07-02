import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './services/users-create.service';
import { UserFindOneService } from './services/user-find-one.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersCreateService: UsersService,
    private readonly userFindOneService: UserFindOneService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersCreateService.execute(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userFindOneService.execute(id);
  }
}
