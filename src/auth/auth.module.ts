import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from "./services/auth.service";
import { UserModule } from "../user/user.module";
import { LocalStrategy } from "./local.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [AuthController],
	imports: [
		UserModule,
		TypeOrmModule.forFeature([User]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET')
			}),
			inject: [ConfigService]
		})
	],
	providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
