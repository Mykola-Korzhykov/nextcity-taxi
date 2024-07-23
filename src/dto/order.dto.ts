import {
  IsArray,
  ArrayMinSize,
  IsEnum,
  ValidateNested,
  ArrayMaxSize,
  IsDate,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator'
import { Type } from 'class-transformer'

import {
  Field,
  Tariff,
  Option,
  Status,
  Driver,
  Car,
} from '../types/order.types'

import { ContainsFields } from '../validators/ContainsFields'
import { ContainsOptions } from 'validators/ContainsOptions'
import { ApiProperty } from '@nestjs/swagger'
import { Dayjs } from 'dayjs'
import { modelOptions, mongoose, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class OrderDto {
  @prop({ unique: true })
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Unique ID for order',
    example: 563241,
  })
  orderId: number

  createdAt?: Date

  @prop({ type: mongoose.Schema.Types.Mixed })
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

  @prop()
  @IsEnum(Tariff)
  @ApiProperty({
    enum: Tariff,
    description: 'Tariff for this order',
    example: Tariff.BUSINESS,
  })
  tariff: Tariff

  @prop({ type: mongoose.Schema.Types.Mixed })
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

  @prop()
  @IsNumber()
  @ApiProperty({
    description: 'Total price for this order',
    example: 15000,
  })
  price: number

  @prop()
  @IsString()
  @ApiProperty({
    description: 'Phone number of customer for this order',
    example: '+1 (612) 545-9393',
  })
  phone: string

  @prop()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Date for this order',
    example: '2024-06-24T19:39:52.379Z',
  })
  date: Date

  @prop()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Time for this order',
    example: '2024-06-24T19:39:52.379Z',
  })
  time: Date

  @prop()
  @IsEnum(Status)
  @ApiProperty({
    enum: Status,
    description: 'Status for this order',
    example: Status.CONFIRMED,
  })
  status: Status

  @prop()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Driver)
  @ApiProperty({
    type: Driver,
    description: 'Driver information for this order',
    example: {
      name: 'Alex',
      phone: '+1 (612) 545-3242',
    },
  })
  driver: Driver

  @prop()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Car)
  @ApiProperty({
    type: Car,
    description: 'Car information for this order',
    example: {
      model: 'Nissan Altima 2014',
      color: 'white',
      licensePlate: 'JDG485',
    },
  })
  car: Car
}
