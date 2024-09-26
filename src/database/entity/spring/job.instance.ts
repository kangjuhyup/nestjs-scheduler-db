import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('BATCH_JOB_INSTANCE')
export class BatchJobInstance {
  @PrimaryGeneratedColumn()
  JOB_INSTANCE_ID: number;

  @Column({ type: 'bigint' })
  VERSION: number;

  @Index()
  @Column({ type: 'varchar', length: 100 })
  JOB_NAME: string;

  @Column({ type: 'varchar', length: 32 })
  JOB_KEY: string;
}
