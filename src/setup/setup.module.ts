import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SetupService } from './setup.service';
import { SetupController } from './setup.controller';
import { Answer } from '../orm/entities';

@Module({
	imports: [TypeOrmModule.forFeature([Answer])],
	providers: [SetupService],
	controllers: [SetupController]
})
export class SetupModule {}
