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
    const jobName = this.reflector.get<string>(CRON_JOB_NAME, target);
    const cronWithDB = this.reflector.get<boolean>(CRON_WITH_DB, target);
    const cronStep = this.reflector.get<boolean>(CRON_STEP, target);

    if (cronWithDB && jobName) {
      const startTime = Date.now();

      const job = await this.batchRepository.selectJob(jobName);
      // Job 이 없을 경우 생성
      if (!job) await this.batchRepository.addJob();

      if (!cronStep) await this.batchRepository.startExecution();
      else await this.batchRepository.startStep();
    }

    return next.handle().pipe(
      tap(async () => {
        if (cronWithDB) {
          const endTime = Date.now();
          if (!cronStep) await this.batchRepository.completeExecution();
          else await this.batchRepository.completeStep();
        }
      }),
      catchError(async (err) => {
        if (cronWithDB) {
          const endTime = Date.now();
          if (!cronStep) await this.batchRepository.failExecution();
          else await this.batchRepository.failStep();
        }
        return err;
      }),
    );
  }
}
