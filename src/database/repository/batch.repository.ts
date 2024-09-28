import { InsertResult, UpdateResult } from 'typeorm';
import { BatchJobExecution } from '../entity/spring/job.execution';
import { BatchStepExecution } from '../entity/spring/step.execution';
import { BatchJobInstance } from '../entity/spring/job.instance';

export const IBATCH_REPOSITORY = 'IBatchRepository';

export interface IBatchRepository {
  createJob(name: string, param: any): BatchJobInstance;
  addJob(job: BatchJobInstance): Promise<InsertResult>;
  selectJob(jobName: string): Promise<BatchJobInstance[]>;
  selectJobFromKey(name: string, param: any): Promise<BatchJobInstance>;
  createExecution(jobId: number): BatchJobExecution;
  startingExecution(execution: BatchJobExecution): Promise<InsertResult>;
  startExecution(executionId: number): Promise<UpdateResult>;
  selectExecution(executionId: number): Promise<BatchJobExecution>;
  completeExecution(executionId: number): Promise<UpdateResult>;
  failExecution(executionId: number): Promise<UpdateResult>;
  startStep(step: BatchStepExecution): Promise<InsertResult>;
  selectStep(stepId: number): Promise<BatchStepExecution>;
  completeStep(stepId: number): Promise<UpdateResult>;
  failStep(stepId: number): Promise<UpdateResult>;
}
