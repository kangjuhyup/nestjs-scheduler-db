import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BatchJobExecution } from './job.execution';

@Entity('BATCH_JOB_EXECUTION_PARAMS')
export class BatchJobExecutionParams {
  @PrimaryGeneratedColumn()
  JOB_EXECUTION_PARAMS_ID: number;

  @ManyToOne(() => BatchJobExecution)
  @JoinColumn({ name: 'JOB_EXECUTION_ID' })
  JOB_EXECUTION_ID: BatchJobExecution;

  @Column({ type: 'varchar', length: 6 })
  TYPE_CD: string;

  @Column({ type: 'varchar', length: 100 })
  KEY_NAME: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  STRING_VAL: string;

  @Column({ type: 'timestamp', nullable: true })
  DATE_VAL: Date;

  @Column({ type: 'bigint', nullable: true })
  LONG_VAL: number;

  @Column({ type: 'double', nullable: true })
  DOUBLE_VAL: number;

  @Column({ type: 'char', length: 1 })
  IDENTIFYING: string;
}
