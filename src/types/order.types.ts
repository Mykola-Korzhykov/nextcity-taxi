import { Type } from 'class-transformer'
import {
  IsString,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class Field {
  @IsString()
  @ApiProperty({ description: 'Address' })
  route: string

  @IsString()
  @ApiProperty({ description: 'Entrance or house/apartment number' })
  entrance: string

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Select' })
  select: string
}

export class Option {
  @IsString()
  @ApiProperty({ description: 'Label of option' })
  name: string

  @IsBoolean()
  @ApiProperty({ description: 'Value of option' })
  value: boolean
}

export class Driver {
  @IsString()
  @ApiProperty({ description: 'Name of driver for order' })
  name: string

  @IsString()
  @ApiProperty({ description: 'Phone number of driver for order' })
  phone: string
}

export class Car {
  @IsString()
  @ApiProperty({ description: 'Model of car for order' })
  model: string

  @IsString()
  @ApiProperty({ description: 'Color of car for order' })
  color: string

  @IsString()
  @ApiProperty({ description: 'License plate number of car for order' })
  licensePlate: string
}

export enum Tariff {
  ECONOMY = 'economy',
  COMFORT = 'comfort',
  BUSINESS = 'business',
  TEST = 'test',
}

export enum Status {
  WAIT = 'wait',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}
