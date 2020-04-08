import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { AnswerService, GameService, GuessService } from './services';
import { Answer, Game, Guess } from '../orm/entities';

@Module({
	imports: [TypeOrmModule.forFeature([Answer, Game, Guess])],
	controllers: [GameController],
	providers: [AnswerService, GameService, GuessService]
})
export class GameModule {}
