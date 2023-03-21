import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

   @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
        const result = await this.usersService.create(createUserDto);
        return result;
    }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'Created'
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findUserbyId(+id);
  }

}
