import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  create(createScheduleDto: CreateScheduleDto) {
    let date_ob = new Date();
    // return 'POST test';
    return this.prisma.sport_Schedule.create({ data: createScheduleDto });
  }

  findAll() {
    return this.prisma.sport_Schedule.findMany({
      orderBy : [
      {
        date: 'desc'
      },
      {
        startTime: 'desc'
      },
      {
        endTime: 'desc'
      }
      ]
    });
  }

  findOne(id: number) {
    return this.prisma.sport_Schedule.findMany({
      where: {
        user_id: id,
      },
      orderBy : [
      {
        date: 'desc'
      },
      {
        startTime: 'desc'
      },
      {
        endTime: 'desc'
      }
      ]
    });
  }

  getSchedulesbyUserIdDB(id: number,sTime: string,eTime: string,date: string) {
    return this.prisma.sport_Schedule.findMany({
      where: {
        user_id: id,
        date: date,
        OR: [
   { startTime: { lte: eTime }, endTime: { gte: sTime } },
   { startTime: { gte: sTime }, endTime: { lte: eTime } },
],
      },
      orderBy:{
        endTime : 'asc',
      },
      select: {
        id: true,
        startTime: true,
        endTime: true,
        date: true
      }
    });
  }
}
