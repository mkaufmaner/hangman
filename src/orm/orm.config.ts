import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
	'orm',
	(): TypeOrmModuleOptions => {
		return {
			type: 'mysql',
			host: process.env.ORM_HOST || 'localhost',
			port: (process.env.ORM_PORT || 3306) as number,
			username: process.env.ORM_USERNAME || 'root',
			password: process.env.ORM_PASSWORD || '',
			database: process.env.ORM_DATABASE || 'hangman',
			entities: [],
			synchronize: true
		};
	},
);
