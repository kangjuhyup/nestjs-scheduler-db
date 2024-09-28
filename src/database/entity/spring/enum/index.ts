export const BatchStatus = {
  COMPLETED: 'COMPLETED', // 성공
  STARTING: 'STARTING', // 시작 중
  STARTED: 'STARTED', // 시작 됨
  STOPPING: 'STOPPING', // 중지 중
  STOPPED: 'STOPPED', // 중지 됨
  FAILED: 'FAILED', // 실패
  ABANDONED: 'ABANDONED', // 작업 중단
  UNKOWN: 'UNKOWN',
} as const;

export type BatchStatus = (typeof BatchStatus)[keyof typeof BatchStatus];

export const ExistStatus = {
  COMPLETED: 'COMPLETED', // 성공
  EXECUTING: 'EXECUTING', // 실행 중
  NOOP: 'NOOP', // 아무 변화 없음
  FAILED: 'FAILED', // 실패
  STOPPED: 'STOPPED', // 중단
} as const;

export type ExistStatus = (typeof ExistStatus)[keyof typeof ExistStatus];
