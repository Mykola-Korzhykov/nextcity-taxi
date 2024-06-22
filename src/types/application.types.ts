import { Type } from 'class-transformer'
import { IsString, IsArray, IsBoolean, IsEnum, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class Field {
  @IsString()
  @ApiProperty({ description: 'Address' })
  route: string

  @IsString()
  @ApiProperty({ description: 'Entrance or house/apartment number' })
  entrance: string

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

export enum Tariff {
  ECONOMY = 'economy',
  COMFORT = 'comfort',
  BUSINESS = 'business',
  TEST = 'test',
}
