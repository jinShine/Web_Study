import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayNotEmpty,
  IsArray,
  isArray,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateMovieDto } from './create-movie.dto';

// @ValidatorConstraint()
// class PasswordValidator implements ValidatorConstraintInterface {
//   validate(
//     value: any,
//     validationArguments?: ValidationArguments,
//   ): Promise<boolean> | boolean {
//     return value.length >= 4 && value.length < 8;
//   }

//   defaultMessage?(validationArguments?: ValidationArguments): string {
//     return `비밀번호의 길이는 4~8자리 여야합니다. 입력된 비밀번호 (${validationArguments.value})`;
//   }
// }

// function IsPasswordValid(validationOptions?: ValidationOptions) {
//   return function (object: object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       validator: PasswordValidator,
//     });
//   };
// }

// export class UpdateMovieDto {
//   @IsNotEmpty()
//   @IsString()
//   @IsOptional()
//   title?: string;

//   @IsNotEmpty()
//   @IsNumber()
//   @IsOptional()
//   year?: number;

//   @IsArray()
//   @ArrayNotEmpty()
//   @IsNumber({}, { each: true })
//   @IsOptional()
//   genreIds?: number[];

//   @IsNotEmpty()
//   @IsString()
//   @IsOptional()
//   detail?: string;

//   @IsNotEmpty()
//   @IsNumber()
//   @IsOptional()
//   directorId?: number;
// }

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
