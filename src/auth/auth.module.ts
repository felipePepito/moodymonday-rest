import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { UserService } from "./services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

@Module({
  controllers: [AuthController],
	imports: [
		TypeOrmModule.forFeature([User])
	],
	providers: [UserService]
})
export class AuthModule {}
