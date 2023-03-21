import { Controller, Get, Post, UseGuards, Body, Patch, Param, Delete, HttpException, HttpStatus, InternalServerErrorException  } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('sport_schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    try{
      let flag = 0;
    let { user_id, startTime, endTime, date } = createScheduleDto;
    console.log(user_id);
    let schedules = await this.schedulesService.getSchedulesbyUserIdDB(+user_id, startTime, endTime, date)
    let sTime = startTime, eTime = endTime;
    for(const schedule of schedules){
      const schSTime = schedule.startTime,schETime = schedule.endTime;
      console.log({sTime,eTime});
      /* 
      For each overlap, we have 3 cases

      Case 1: The start and end time of our new schedule completely overlap with the start and end time of an already present schedule
      Case 2: The end time of our new schedule overlaps with the start time of an already present schedule
      Case 3: The start time of our new schedule overlaps with the end time of an already present schedule
      */
      if(sTime >= schSTime && eTime <= schETime) throw 'Slot not available for booking';
      if(sTime < schSTime && eTime > schSTime) eTime = schSTime;
      if(eTime > schETime && sTime < schETime) sTime = schETime;
      console.log({sTime,eTime});
    }
    createScheduleDto.startTime = sTime;
    createScheduleDto.endTime = eTime;

    console.log(createScheduleDto);
    return this.schedulesService.create(createScheduleDto);
  }catch(error){
    console.log("error");
    throw new InternalServerErrorException(error);
  }
}

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() { 
    return this.schedulesService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(+id);
  }

}
