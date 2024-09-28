import { InsertResult, UpdateResult } from 'typeorm';
import { BatchJobExecution } from '../entity/spring/job.execution';
import { BatchStepExecution } from '../entity/spring/step.execution';
import { BatchJobInstance } from '../entity/spring/job.instance';

export const IBATCH_REPOSITORY = 'IBatchRepository';

export interface IBatchRepository {
  addJob(job: BatchJobInstance): Promise<InsertResult>;
  selectJob(jobName: string): Promise<BatchJobInstance>;
  startExecution(execution: BatchJobExecution): Promise<InsertResult>;
  selectExecution(executionId: number): Promise<BatchJobExecution>;
  completeExecution(executionId: number): Promise<UpdateResult>;
  failExecution(executionId: number): Promise<UpdateResult>;
  startStep(step: BatchStepExecution): Promise<InsertResult>;
  selectStep(stepId: number): Promise<BatchStepExecution>;
  completeStep(stepId: number): Promise<UpdateResult>;
  failStep(stepId: number): Promise<UpdateResult>;
}
