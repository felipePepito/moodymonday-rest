import { Module } from "@nestjs/common";
import { MoodStateModule } from './mood-state/mood-state.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from "./app.controller";
@Module({
	imports: [
		TypeOrmModule.forRoot(),
		MoodStateModule,
		AuthModule,
		UserModule
	],
	controllers: [AppController],
	providers: []
})
export class AppModule {
}
