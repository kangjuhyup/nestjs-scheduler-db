import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from '@nestjs/schedule'
import { ScheduleModuleOptions } from '@nestjs/schedule/dist/interfaces/schedule-module-options.interface';

type SchedulerDBInitParmater = {
    database : TypeOrmModuleOptions
    schedule : ScheduleModuleOptions
};

@Module({})
export class SchedulerDBModule {
  static forRoot(
    {database,schedule} : SchedulerDBInitParmater
  ) : DynamicModule {
    return {
        module : SchedulerDBModule,
        imports : [
            DatabaseModule.forRoot(database),
            ScheduleModule.forRoot(schedule)
        ], 
    }
  }
}
 