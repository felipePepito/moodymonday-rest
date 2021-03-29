import { Module } from "@nestjs/common";
import { MoodStateModule } from './mood-state/mood-state.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
@Module({
	imports: [
		TypeOrmModule.forRoot(),
		MoodStateModule,
		AuthModule
	],
	controllers: [],
	providers: []
})
export class AppModule {
}
