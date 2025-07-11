import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { User } from './entities/user.entity';
import { ApiQuery } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get('cursor')
  @ApiQuery({
    name: 'cursor',
    required: false,
    description: 'set id of user',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'name of user',
    example: 'John Doe',
  })
  async findAllCursor(
    @Query('name') name?: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit = 15,
  ): Promise<{ data: User[]; nextCursor: string | null; count: number }> {
    return await this.usersService.findAll(name, cursor, Number(limit));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(id);
  }

  @Put(':id/status')
  async setStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto): Promise<User> {
    return await this.usersService.setActiveStatus(id, updateStatusDto.active);
  }
}
