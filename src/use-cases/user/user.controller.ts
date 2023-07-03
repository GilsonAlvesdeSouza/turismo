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
    return this.userService.findAllUsers();
  }

  @Get('trashed')
  @UseGuards(AuthGuard('jwt'))
  async findAllTrashed() {
    return this.userService.findAllTrashedUsers();
  }

  @Get('detail')
  @UseGuards(AuthGuard('jwt'))
  async detailLoggedUser(@Req() req: Request) {
    const id = req.user['id'];
    return this.userService.findOneUser(+id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findOneUser(+id);
  }

  @UseInterceptors(ValidationExceptionInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Patch(':id/restore')
  async restore(@Param('id', ParseIntPipe) id: string) {
    return this.userService.restoreUser(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/soft-delete')
  async softDelete(@Param('id', ParseIntPipe) id: string) {
    return this.userService.softDeleteUser(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string) {
    return this.userService.hardDeleteUser(+id);
  }
}
