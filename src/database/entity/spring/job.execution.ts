import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BatchJobInstance } from './job.instance';

@Entity('BATCH_JOB_EXECUTION')
export class BatchJobExecution {
  @PrimaryGeneratedColumn()
  JOB_EXECUTION_ID: number;

  @ManyToOne(() => BatchJobInstance)
  @JoinColumn({ name: 'JOB_INSTANCE_ID' })
  JOB_INSTANCE_ID: BatchJobInstance;

  @Column({ type: 'timestamp' })
  CREATE_TIME: Date;

  @Column({ type: 'timestamp', nullable: true })
  START_TIME: Date;

  @Column({ type: 'timestamp', nullable: true })
  END_TIME: Date;

  @Column({ type: 'varchar', length: 10 })
  STATUS: string;

  @Column({ type: 'varchar', length: 2500, nullable: true })
  EXIT_CODE: string;

  @Column({ type: 'varchar', length: 2500, nullable: true })
  EXIT_MESSAGE: string;

  @Column({ type: 'timestamp', nullable: true })
  LAST_UPDATED: Date;

  @Column({ type: 'bigint' })
  VERSION: number;
}
