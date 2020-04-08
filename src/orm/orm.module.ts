import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import ormConfig from './orm.config';

import { Answer, Game, Guess } from './entities';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule.forFeature(ormConfig)],
			useFactory: (configService: ConfigService) => {
				return Object.assign(
					configService.get<TypeOrmModuleOptions>('orm'),
					{
						entities: [Answer, Game, Guess]
					},
				);
			},
			inject: [ConfigService]
		})
	],
	exports: [TypeOrmModule]
})
export class OrmModule {}
