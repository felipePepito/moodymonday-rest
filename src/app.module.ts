import { Module } from "@nestjs/common";
import { MoodStateModule } from './mood-state/mood-state.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
@Module({
	imports: [
		TypeOrmModule.forRoot(),
		ConfigModule.forRoot({envFilePath: '.dev.env'}),
		MoodStateModule,
		AuthModule,
		UserModule
	],
	controllers: [AppController],
	providers: []
})
export class AppModule {
}
