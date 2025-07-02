import { formatRut, sanitiseRut, validateRut } from 'chilerut';

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';

export function IsRut(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isRut',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string | undefined | null) {
          if (!value) {
            return false;
          }

          const formatedRut = formatRut(sanitiseRut(value));

          const isValid: boolean = validateRut(formatedRut);

          return typeof value === 'string' && isValid;
        },
      },
    });
  };
}

@ValidatorConstraint({ name: 'validateRutFirmante', async: false })
export class ValidateRutFirmante implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const relatedValue = args.object as { arregloRutFirmante: string[] };
    const founded = relatedValue.arregloRutFirmante.filter(
      (rut: string) => rut === text,
    );

    return founded.length === 1;
  }

  defaultMessage() {
    // args: ValidationArguments
    // here you can provide default error message if validation failed
    return 'Text ($value) is too short or too long!';
  }
}

@ValidatorConstraint({ name: 'isChileanPhoneNumber', async: false })
export class IsChileanPhoneNumberConstraint
  implements ValidatorConstraintInterface
{
  // eslint-disable-next-line
  validate(phone: string, _args: ValidationArguments) {
    const regex = /^\+56\s?9\d{8}$/;
    return typeof phone === 'string' && regex.test(phone);
  }

  // eslint-disable-next-line
  defaultMessage(_args: ValidationArguments) {
    return 'El número de celular debe ser chileno, con formato +56 9XXXXXXXX';
  }
}

export function IsChileanPhoneNumber() {
  return Validate(IsChileanPhoneNumberConstraint);
}
