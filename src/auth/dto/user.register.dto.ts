import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class UserRegisterDto {
	@IsString()
	username: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	password: string;
}
