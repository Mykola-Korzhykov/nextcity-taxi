import { IsNumber, IsOptional } from 'class-validator'
import { OrderDto } from './order.dto'
import { Field, Tariff, Option, Driver, Car, Status } from 'types/order.types'

export class PatchOrderDto extends OrderDto {
  @IsOptional()
  fields: Field[]

  @IsOptional()
  tariff: Tariff

  @IsOptional()
  options: Option[]

  @IsOptional()
  price: number

  @IsOptional()
  phone: string

  @IsOptional()
  date: Date

  @IsOptional()
  time: Date

  @IsOptional()
  status: Status

  @IsOptional()
  driver: Driver

  @IsOptional()
  car: Car
}
