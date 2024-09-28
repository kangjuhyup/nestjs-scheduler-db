import { Cron, CronExpression } from '@nestjs/schedule';
import { applyDecorators, SetMetadata } from '@nestjs/common';

export const CRON_WITH_DB = 'CRON_WITH_DB';
export const CRON_JOB_NAME = 'CRON_JAB_JNAME';
export const CRON_STEP = 'CRON_STEP';

/**
 * @description Cron 데코레이터 확장
 * @param cronTime
 */
export function CronWithDB(param: { jobName: string; cronTime: string }) {
  if (!param.jobName) throw new Error('배치 Job 이름이 없습니다.');
  if (!param.cronTime) throw new Error('크론 시간 표현식이 없습니다.');
  return applyDecorators(
    Cron(param.cronTime),
    SetMetadata(CRON_WITH_DB, true),
    SetMetadata(CRON_JOB_NAME, param.jobName),
  );
}

/**
 * @description 배치 서비스에서 메소드 스탭 추적을 위한 데코레이터
 */
export function CronStep() {
  return applyDecorators(SetMetadata(CRON_STEP, true));
}
