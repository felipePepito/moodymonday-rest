import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from "./services/auth.service";
import { UserModule } from "../user/user.module";
import { LocalStrategy } from "./local.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

@Module({
  controllers: [AuthController],
	imports: [
		UserModule,
		TypeOrmModule.forFeature([User])
	],
	providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
