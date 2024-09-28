import { Injectable } from '@nestjs/common';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { BatchJobExecution } from '../../entity/spring/job.execution';
import { BatchJobInstance } from '../../entity/spring/job.instance';
import { BatchStepExecution } from '../../entity/spring/step.execution';
import { IBatchRepository } from '../batch.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BatchRepository implements IBatchRepository {
  constructor(
    @InjectRepository(BatchJobInstance)
    private readonly job: Repository<BatchJobInstance>,
    @InjectRepository(BatchJobExecution)
    private readonly execution: Repository<BatchJobExecution>,
    @InjectRepository(BatchStepExecution)
    private readonly step: Repository<BatchStepExecution>,
  ) {}
  addJob(job: BatchJobInstance): Promise<InsertResult> {
    throw new Error('Method not implemented.');
  }
  selectJob(jobName: string): Promise<BatchJobInstance> {
    throw new Error('Method not implemented.');
  }
  startExecution(execution: BatchJobExecution): Promise<InsertResult> {
    throw new Error('Method not implemented.');
  }
  selectExecution(executionId: number): Promise<BatchJobExecution> {
    throw new Error('Method not implemented.');
  }
  completeExecution(executionId: number): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
  }
  failExecution(executionId: number): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
  }
  startStep(step: BatchStepExecution): Promise<InsertResult> {
    throw new Error('Method not implemented.');
  }
  selectStep(stepId: number): Promise<BatchStepExecution> {
    throw new Error('Method not implemented.');
  }
  completeStep(stepId: number): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
  }
  failStep(stepId: number): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
  }
}
