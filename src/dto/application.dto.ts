import {
  IsArray,
  ArrayMinSize,
  IsEnum,
  ValidateNested,
  ArrayMaxSize,
} from 'class-validator'
import { Type } from 'class-transformer'

import { Field, Tariff, Option } from '../types/application.types'

import { ContainsFields } from '../validators/ContainsFields'
import { ContainsOptions } from 'validators/ContainsOptions'

export class ApplicationDto {
  @IsArray()
  @ContainsFields()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => Field)
  fields: Field[]

  @IsEnum(Tariff)
  tariff: Tariff

  @IsArray()
  @ArrayMaxSize(6)
  @ContainsOptions()
  @ValidateNested({ each: true })
  @Type(() => Option)
  options: Option[]
}
