import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidationExceptionInterceptor } from 'src/interceptors/validationExceptionInterceptor';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @UseInterceptors(ValidationExceptionInterceptor)
  create(@Body() data: CreateScheduleDto, @Req() req: Request) {
    const idUser = req.user['id'] as number;
    data.idUser = idUser;

    return this.scheduleService.create(data);
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id) {
    return this.scheduleService.findById(id);
  }

  @Patch(':id')
  @UseInterceptors(ValidationExceptionInterceptor)
  update(
    @Param('id', ParseIntPipe) id,
    @Body() data: UpdateScheduleDto,
    @Req() req: Request,
  ) {
    const idUser = req.user['id'] as number;
    data.idUser = idUser;

    return this.scheduleService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    return this.scheduleService.remove(id);
  }
}
