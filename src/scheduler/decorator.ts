import { Cron, CronExpression } from '@nestjs/schedule';
import { applyDecorators, SetMetadata } from '@nestjs/common';

export const CRON_WITH_DB = 'CRON_WITH_DB';
export const CRON_STEP = 'CRON_STEP';

/**
 * @description Cron 데코레이터 확장
 * @param cronTime
 */
export function CronWithDB(cronTime: string = CronExpression.EVERY_MINUTE) {
  return applyDecorators(Cron(cronTime), SetMetadata(CRON_WITH_DB, true));
}

/**
 * @description 배치 서비스에서 메소드 스탭 추적을 위한 데코레이터
 */
export function CronStep() {
  return applyDecorators(SetMetadata(CRON_STEP, true));
}
