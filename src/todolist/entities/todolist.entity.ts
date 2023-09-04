import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StatusTodo {
  TODO = 'todo',
  PROGRESS = 'progress',
  COMPLETED = 'completed',
}

//add @Entity to tell the typeform that the class TodolistEntity should generate into the table.
@Entity()
export class TodolistEntity {
  @PrimaryGeneratedColumn()
  id: number; //id with auto increment

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', default: StatusTodo.TODO, enum: StatusTodo })
  status: string; //status can take one of 3 values - todo,progress,completed

  @Column({ nullable: true, type: 'bigint', default: new Date().getTime() })
  due_date: number; //this is to handle different timezones(UNIX timestamp).

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
