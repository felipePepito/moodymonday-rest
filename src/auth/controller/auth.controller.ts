import { Body, Controller, Get, InternalServerErrorException, Logger, Post, Request, UseGuards } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { JwtGuard } from "../guards/jwt.guard";
import { LocalGuard } from "../guards/local.guard";


@Controller('auth')
export class AuthController {

	private logger = new Logger('Auth Service');

	constructor(
		private userService: UserService,
		private authService: AuthService
	) {
	}

	// Sidenote: AuthGuard / Passport returns a user object and assigns it to the Request
	@UseGuards(LocalGuard)
	@Post('login')
	async login(@Request() req): Promise<{access_token: string}> {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user
	}

	@Post('register')
	async register(@Body() userdto: UserDto): Promise<{access_token: string}> {
		return await this.userService.create(userdto)
			.then(
				user => { return this.authService.login(user) }
				)
	}
}
