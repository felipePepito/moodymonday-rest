import { Body, Controller, InternalServerErrorException, Post, Request, UseGuards } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import { UserService } from "../../user/user.service";
import { AuthGuard } from "@nestjs/passport";


@Controller('auth')
export class AuthController {

	constructor(
		private userService: UserService
	) {
	}

	// Sidenote: AuthGuard / Passport returns a user object and assigns it to the Request
	@UseGuards(AuthGuard('local'))
	@Post('login')
	async login(@Request() requ) {
		return requ.user;
	}

	@Post('signin')
	async signin(@Body() userdto: UserDto): Promise<{id: number}> {
		return await this.userService.create(userdto)
			.then(
				user => { return {id: user.id} }
				)
			.catch(
				reason => { throw new InternalServerErrorException(); }
			)
	}
}
