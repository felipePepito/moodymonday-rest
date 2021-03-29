import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import { UserService } from "../services/user.service";

@Controller('auth')
export class AuthController {

	constructor(
		private userService: UserService
	) {
	}

	@Post('signup')
	async signup(@Body() userdto: UserDto): Promise<{id: number}> {
		return await this.userService.create(userdto)
			.then(
				user => { return {id: user.id} }
				);
	}
}
