import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./local.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";
import { UserService } from "./services/user.service";
import { PassportModule } from "@nestjs/passport";

@Module({
  controllers: [AuthController],
	imports: [
		TypeOrmModule.forFeature([User]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET')
			}),
			inject: [ConfigService]
		}),
		PassportModule
	],
	providers: [AuthService, UserService, LocalStrategy, JwtStrategy, ConfigService],
	exports: []
})
export class AuthModule {}
