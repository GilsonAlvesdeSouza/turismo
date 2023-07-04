import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationExceptionInterceptor } from '../../interceptors/validationExceptionInterceptor';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(ValidationExceptionInterceptor)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.userService.findAll();
  }

  @Get('trashed')
  @UseGuards(AuthGuard('jwt'))
  async findAllTrashed() {
    return this.userService.findAllTrashedUsers();
  }

  @Get('detail')
  @UseGuards(AuthGuard('jwt'))
  async detailLoggedUser(@Req() req: Request) {
    const id = req.user['id'] as number;
    return this.userService.findById(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findById(@Param('id', ParseIntPipe) id) {
    return this.userService.findById(id);
  }

  @UseInterceptors(ValidationExceptionInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Patch(':id/restore')
  async restore(@Param('id', ParseIntPipe) id) {
    return this.userService.restoreUser(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/soft-delete')
  async softDelete(@Param('id', ParseIntPipe) id) {
    return this.userService.softDelete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.userService.hardDelete(id);
  }
}
