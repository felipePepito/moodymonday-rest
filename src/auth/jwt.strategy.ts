import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "./services/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	private logger = new Logger('JWT Guard');

	constructor(
		private configService: ConfigService,
		private userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET')
			});
	}

	async validate(payload: any) {
		return this.userService.findOne(payload.username);
	}
}
