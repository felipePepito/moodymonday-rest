import { Body, Controller, Get, Logger, Post, Request, UseGuards } from "@nestjs/common";
import { UserRegisterDto } from "../dto/user.register.dto";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { JwtGuard } from "../guards/jwt.guard";
import { LocalGuard } from "../guards/local.guard";
import { UserReturnDto } from "../dto/user.return.dto";


@Controller('auth')
export class AuthController {

	private logger = new Logger('Auth Service');

	constructor(
		private userService: UserService,
		private authService: AuthService
	) {
	}

	@UseGuards(LocalGuard)
	@Post('login')
	async login(@Request() req): Promise<UserReturnDto> {
		return await this.authService.login(req.user.id, req.user.email)
			.then(jwt => {
				req.user.jwt = jwt;
				return req.user;
			});
	}

	@UseGuards(JwtGuard)
	@Get('profile')
	getProfile(@Request() req) {
		console.log(req);
		return new UserReturnDto(req.user.id, req.user.username, req.user.email, undefined)
	}

	@Post('register')
	async register(@Body() userdto: UserRegisterDto): Promise<UserReturnDto> {
		return await this.userService.create(userdto)
			.then(
				user => this.authService.login(user.id, user.email)
					.then(jwt => {
						return new UserReturnDto(user.id, user.username, user.email, jwt);
					})
				)
	}
}
