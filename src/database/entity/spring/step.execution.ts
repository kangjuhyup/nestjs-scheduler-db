import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BatchJobExecution } from './job.execution';

@Entity('BATCH_STEP_EXECUTION')
export class BatchStepExecution {
  @PrimaryGeneratedColumn()
  STEP_EXECUTION_ID: number;

  @ManyToOne(() => BatchJobExecution)
  @JoinColumn({ name: 'JOB_EXECUTION_ID' })
  JOB_EXECUTION_ID: BatchJobExecution;

  @Column({ type: 'varchar', length: 100 })
  STEP_NAME: string;

  @Column({ type: 'timestamp', nullable: true })
  START_TIME: Date;

  @Column({ type: 'timestamp', nullable: true })
  END_TIME: Date;

  @Column({ type: 'varchar', length: 10 })
  STATUS: string;

  @Column({ type: 'bigint' })
  COMMIT_COUNT: number;

  @Column({ type: 'bigint' })
  READ_COUNT: number;

  @Column({ type: 'bigint' })
  FILTER_COUNT: number;

  @Column({ type: 'bigint' })
  WRITE_COUNT: number;

  @Column({ type: 'bigint' })
  READ_SKIP_COUNT: number;

  @Column({ type: 'bigint' })
  WRITE_SKIP_COUNT: number;

  @Column({ type: 'bigint' })
  PROCESS_SKIP_COUNT: number;

  @Column({ type: 'bigint' })
  ROLLBACK_COUNT: number;

  @Column({ type: 'varchar', length: 2500, nullable: true })
  EXIT_CODE: string;

  @Column({ type: 'varchar', length: 2500, nullable: true })
  EXIT_MESSAGE: string;

  @Column({ type: 'timestamp', nullable: true })
  LAST_UPDATED: Date;

  @Column({ type: 'bigint' })
  VERSION: number;
}
