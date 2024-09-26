import {
  Injectable,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { CRON_STEP, CRON_WITH_DB } from './decorator';

@Injectable()
export class BatchInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const target = context.getHandler();
    const cronWithDB = this.reflector.get<boolean>(CRON_WITH_DB, target);
    const cronStep = this.reflector.get<boolean>(CRON_STEP, target);
    if (!cronWithDB) {
      return next.handle();
    }

    //TODO: 배치 시작 상태 저장
    const startTime = Date.now();

    if (cronStep) {
      //TODO : 배치 실행 스탭 저장
    }

    return next.handle().pipe(
      tap(async () => {
        //TODO: 배치 종료 상태 저장
        const endTime = Date.now();
      }),
    );
  }
}
