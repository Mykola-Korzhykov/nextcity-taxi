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
import { ApiProperty } from '@nestjs/swagger'

export class ApplicationDto {
  @IsArray()
  @ContainsFields()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => Field)
  @ApiProperty({
    type: Field,
    isArray: true,
    description:
      'An array of objects where each object is a field with an address and its information, and the array is the entire route.',
    example: [
      { route: 'From address', entrance: '152A', select: 'Select' },
      { route: 'To address', entrance: 'Entrance number', select: 'Select' },
    ],
  })
  fields: Field[]

  @IsEnum(Tariff)
  @ApiProperty({
    enum: Tariff,
    description: 'Tariff for this order',
    example: Tariff.BUSINESS,
  })
  tariff: Tariff

  @IsArray()
  @ArrayMaxSize(6)
  @ContainsOptions()
  @ValidateNested({ each: true })
  @Type(() => Option)
  @ApiProperty({
    type: Option,
    isArray: true,
    description: 'An array of additional options for ordering',
    example: [
      { name: 'Name of option', value: true },
      { name: 'Name of option', value: false },
    ],
  })
  options: Option[]
}
