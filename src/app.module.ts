import { Module } from '@nestjs/common';
import { HealthzModule } from './healthz/healthz.module';
import { OrmModule } from './orm/orm.module';
import { GameModule } from './game/game.module';
import { SetupModule } from './setup/setup.module';

@Module({
	imports: [HealthzModule, OrmModule, GameModule, SetupModule]
})
export class AppModule {}
