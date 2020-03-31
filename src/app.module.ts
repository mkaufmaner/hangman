import { Module } from '@nestjs/common';
import { HealthzModule } from './healthz/healthz.module';
import { OrmModule } from './orm/orm.module';

@Module({
	imports: [HealthzModule, OrmModule]
})
export class AppModule {}
