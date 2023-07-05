import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TrimSpacesPipe } from 'src/pipes/trimSpace.pipe';
import { ValidationExceptionInterceptor } from '../../interceptors/validationException.interceptor';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
@UsePipes(new TrimSpacesPipe())
@UseGuards(AuthGuard('jwt'))
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
