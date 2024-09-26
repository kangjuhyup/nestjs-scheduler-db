import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BatchStepExecution } from './step.execution';

@Entity('BATCH_STEP_EXECUTION_CONTEXT')
export class BatchStepExecutionContext {
  @PrimaryGeneratedColumn()
  STEP_EXECUTION_CONTEXT_ID: number;

  @ManyToOne(() => BatchStepExecution)
  @JoinColumn({ name: 'STEP_EXECUTION_ID' })
  STEP_EXECUTION_ID: BatchStepExecution;

  @Column({ type: 'varchar', length: 2500, nullable: true })
  SHORT_CONTEXT: string;

  @Column({ type: 'text', nullable: true })
  SERIALIZED_CONTEXT: string;
}
