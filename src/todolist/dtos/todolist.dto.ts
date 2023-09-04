import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class TodolistDto {
  @IsOptional() // Make the field optional for PUT requests
  @IsString()
  @Length(10, 20)
  title: string;

  @IsOptional() // Make the field optional for PUT requests
  @IsString()
  description: string;

  @IsOptional() // Make the field optional for PUT requests
  @IsString()
  status: string;

  @IsOptional() // Make the field optional for PUT requests
  @IsNumber()
  due_date: number;
}
