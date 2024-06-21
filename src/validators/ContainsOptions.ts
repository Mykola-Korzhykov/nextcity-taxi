import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'
import { Option } from '../types/application.types'

export function ContainsOptions(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'containsOptions',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value)) return false

          const optionKeys = Object.keys(new Option())
          return value.every((item) => {
            return optionKeys.every((key) => {
              const keyType = typeof new Option()[key]
              return (
                item && typeof item === 'object' && typeof item[key] === keyType
              )
            })
          })
        },
        defaultMessage(args: ValidationArguments) {
          return `Each element in the ${args.property} array must contain properties: ${Object.keys(new Option()).join(', ')} of the correct type`
        },
      },
    })
  }
}
