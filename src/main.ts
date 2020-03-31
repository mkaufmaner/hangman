import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

export const bootstrap = async (): Promise<INestApplication> => {
	const app = await NestFactory.create(AppModule);

	const options = new DocumentBuilder()
		.setTitle('Hangman')
		.setDescription('A Hangman Game API')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);

	await app.listen(process.env.PORT || 3000);

	return app;
};
bootstrap();
