import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class UserDto {
	@IsOptional()
	@IsNumber()
	id: number;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	password: string;
}
