import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { BatchJobInstance } from './job.instance';
import { BatchStatus, ExistStatus } from './enum';

@Entity('BATCH_JOB_EXECUTION')
export class BatchJobExecution {
  @PrimaryGeneratedColumn()
  JOB_EXECUTION_ID: number;

  @Column({ type: 'bigint' })
  JOB_INSTANCE_ID: number;

  @ManyToOne(() => BatchJobInstance)
  @JoinColumn({ name: 'JOB_INSTANCE_ID' })
  JOB_INSTANCE: BatchJobInstance;

  @Column({ type: 'timestamp' })
  CREATE_TIME: Date;

  @Column({ type: 'timestamp', nullable: true })
  START_TIME: Date;

  @Column({ type: 'timestamp', nullable: true })
  END_TIME: Date;

  @Column({ type: 'varchar', length: 10 })
  STATUS: BatchStatus;

  @Column({ type: 'varchar', length: 2500, nullable: true })
  EXIT_CODE: ExistStatus;

  @Column({ type: 'varchar', length: 2500, nullable: true })
  EXIT_MESSAGE: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  LAST_UPDATED: Date;

  @Column({ type: 'bigint' })
  VERSION: number;
}
