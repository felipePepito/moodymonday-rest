import { Module } from "@nestjs/common";
import { MoodStateModule } from './mood-state/mood-state.module';
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
	imports: [
		TypeOrmModule.forRoot(),
		MoodStateModule
	],
	controllers: [],
	providers: []
})
export class AppModule {
}
