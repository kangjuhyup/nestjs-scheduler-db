import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BatchJobInstance } from './entity/spring/job.instance';
import { BatchJobExecution } from './entity/spring/job.execution';
import { BatchJobExecutionParams } from './entity/spring/job.execution.param';
import { BatchJobExecutionContext } from './entity/spring/job.execution.context';
import { BatchStepExecution } from './entity/spring/step.execution';
import { BatchStepExecutionContext } from './entity/spring/step.execution.context';
import { IBATCH_REPOSITORY } from './repository/batch.repository';
import { BatchRepository } from './repository/impl/batch.repository';

@Module({})
export class DatabaseModule {
  static forRoot(
    database: TypeOrmModuleOptions,
    isSpring?: boolean,
  ): DynamicModule {
    const entities = isSpring
      ? [
          BatchJobInstance,
          BatchJobExecution,
          BatchJobExecutionParams,
          BatchJobExecutionContext,
          BatchStepExecution,
          BatchStepExecutionContext,
        ]
      : [];

    const repositories = isSpring
      ? [
          {
            provide: IBATCH_REPOSITORY,
            useClass: BatchRepository,
          },
        ]
      : [];

    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot(database),
        TypeOrmModule.forFeature(entities),
      ],
      providers: [...repositories],
    };
  }
}
