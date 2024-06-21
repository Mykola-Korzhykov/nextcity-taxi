import { Type } from 'class-transformer'
import { IsString, IsArray, IsBoolean, IsEnum, IsNumber } from 'class-validator'

export class Field {
  @IsString()
  route: string

  @IsString()
  entrance: string

  @IsString()
  select: string

  @IsNumber()
  valera: number
}

export class Option {
  @IsString()
  name: string

  @IsBoolean()
  value: boolean
}

export enum Tariff {
  ECONOMY = 'economy',
  COMFORT = 'comfort',
  BUSINESS = 'business',
  TEST = 'test',
}
