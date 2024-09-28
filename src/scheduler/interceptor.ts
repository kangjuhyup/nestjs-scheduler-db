import {
  Injectable,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { CRON_JOB_NAME, CRON_STEP, CRON_WITH_DB } from './decorator';
import {
  IBATCH_REPOSITORY,
  IBatchRepository,
} from 'src/database/repository/batch.repository';

@Injectable()
export class BatchInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    @Inject(IBATCH_REPOSITORY)
    private readonly batchRepository: IBatchRepository,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const target = context.getHandler();
    const jobName =
      this.reflector.get<string>(CRON_JOB_NAME, target) || target.name;
    const cronWithDB = this.reflector.get<boolean>(CRON_WITH_DB, target);
    const cronStep = this.reflector.get<boolean>(CRON_STEP, target);

    let executionId: number;

    if (cronWithDB && jobName) {
      const job = await this.batchRepository.selectJob(jobName);
      // Job 이 없을 경우 생성
      if (!job || job.length === 0) {
        // jobkey 가 같은게 없을 경우 version 을 올려서 생성한다.

        const existedJob = await this.batchRepository.selectJobFromKey(
          jobName,
          context.getArgs(),
        );
        if (!existedJob) {
          const jobInstance = this.batchRepository.createJob(
            jobName,
            context.getArgs(),
          );
          jobInstance.VERSION = job.length + 1;
          await this.batchRepository.addJob(jobInstance);
        }
      }

      if (!cronStep) {
        const job = await this.batchRepository.selectJobFromKey(
          jobName,
          context.getArgs(),
        );
        const jobExecution = this.batchRepository.createExecution(
          job.JOB_INSTANCE_ID,
        );
        //TODO : execution parameter 에 따라 execution version 도 올라가야된다.
        await this.batchRepository.startingExecution(jobExecution);
      } else {
        await this.batchRepository.startStep();
      }
    }

    return next.handle().pipe(
      // 배치 or 스탭 완료
      tap(async () => {
        if (cronWithDB) {
          if (!cronStep && executionId)
            await this.batchRepository.startExecution(executionId);
        }
      }),
      // 배치 or 스탭 완료
      tap(async () => {
        if (cronWithDB) {
          const endTime = Date.now();
          if (!cronStep && executionId)
            await this.batchRepository.completeExecution(executionId);
          if (cronStep) await this.batchRepository.completeStep();
        }
      }),
      catchError(async (err) => {
        if (cronWithDB) {
          const endTime = Date.now();
          if (!cronStep && executionId)
            await this.batchRepository.failExecution(executionId);
          if (cronStep) await this.batchRepository.failStep();
        }
        return err;
      }),
    );
  }
}
