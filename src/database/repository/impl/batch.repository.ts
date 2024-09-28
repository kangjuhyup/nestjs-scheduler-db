import { Injectable } from '@nestjs/common';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { BatchJobExecution } from '../../entity/spring/job.execution';
import { BatchJobInstance } from '../../entity/spring/job.instance';
import { BatchStepExecution } from '../../entity/spring/step.execution';
import { IBatchRepository } from '../batch.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BatchStatus, ExistStatus } from 'src/database/entity/spring/enum';
import * as crypto from 'crypto';
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
  createJob(name: string, param: any, version?: number) {
    this.job.create({
      JOB_NAME: name,
      VERSION: version || 1,
      JOB_KEY: crypto
        .createHash('md5')
        .update(name + param)
        .digest('hex'),
    });
  }
  async addJob(job: BatchJobInstance): Promise<InsertResult> {
    return await this.job.insert(job);
  }
  async selectJob(jobName: string): Promise<BatchJobInstance[]> {
    return await this.job.find({
      where: {
        JOB_NAME: jobName,
      },
    });
  }

  async selectJobFromKey(name: string, param: any): Promise<BatchJobInstance> {
    return await this.job.findOne({
      where: {
        JOB_KEY: crypto
          .createHash('md5')
          .update(name + param)
          .digest('hex'),
      },
    });
  }

  createExecution(jobId: number): BatchJobExecution {
    return this.execution.create({
      JOB_INSTANCE_ID: jobId,
      STATUS: BatchStatus.STARTING,
      EXIT_CODE: ExistStatus.EXECUTING,
      CREATE_TIME: new Date(),
      VERSION: 1,
    });
  }

  async startingExecution(execution: BatchJobExecution): Promise<InsertResult> {
    return await this.execution.insert(execution);
  }

  async startExecution(executionId: number): Promise<UpdateResult> {
    return await this.execution.update(
      {
        STATUS: BatchStatus.STARTED,
      },
      {
        JOB_EXECUTION_ID: executionId,
      },
    );
  }
  async selectExecution(executionId: number): Promise<BatchJobExecution> {
    return await this.execution.findOne({
      where: {
        JOB_EXECUTION_ID: executionId,
      },
    });
  }
  async completeExecution(executionId: number): Promise<UpdateResult> {
    return await this.execution.update(
      {
        STATUS: BatchStatus.COMPLETED,
        EXIT_CODE: ExistStatus.COMPLETED,
        END_TIME: new Date(),
      },
      {
        JOB_EXECUTION_ID: executionId,
      },
    );
  }
  async failExecution(executionId: number): Promise<UpdateResult> {
    return await this.execution.update(
      {
        STATUS: BatchStatus.FAILED,
        EXIT_CODE: ExistStatus.FAILED,
      },
      {
        JOB_EXECUTION_ID: executionId,
      },
    );
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
