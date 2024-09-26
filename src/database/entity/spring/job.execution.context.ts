import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BatchJobExecution } from './job.execution';

@Entity('BATCH_JOB_EXECUTION_CONTEXT')
export class BatchJobExecutionContext {
  @PrimaryGeneratedColumn()
  JOB_EXECUTION_CONTEXT_ID: number;

  @ManyToOne(() => BatchJobExecution)
  @JoinColumn({ name: 'JOB_EXECUTION_ID' })
  JOB_EXECUTION_ID: BatchJobExecution;

  @Column({ type: 'varchar', length: 2500, nullable: true })
  SHORT_CONTEXT: string;

  @Column({ type: 'text', nullable: true })
  SERIALIZED_CONTEXT: string;
}
