import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

import { Field } from '../types/application.types'

export function ContainsFields(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'containsFields',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value)) return false

          const fieldKeys = Object.keys(new Field())
          return value.every((item) => {
            return fieldKeys.every((key) => {
              return (
                item &&
                typeof item === 'object' &&
                typeof item[key] === 'string'
              )
            })
          })
        },
        defaultMessage(args: ValidationArguments) {
          return `Each element in the ${args.property} array must contain properties: ${Object.keys(new Field()).join(', ')} of type string`
        },
      },
    })
  }
}
