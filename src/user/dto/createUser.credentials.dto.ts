import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/, {
    message:
      'Password needs to have at least one of each: special character, upper case letter, lower case letter and a numeric. Password should be between 8 and 20 characters long',
  })
  password: string;
}
