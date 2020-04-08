import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import {
	ApiParam,
	ApiOkResponse,
	ApiOperation,
	ApiCreatedResponse
} from '@nestjs/swagger';

import { GameDto, GuessRequestDto, GuessResponseDto } from './dtos';

import { GameService, AnswerService, GuessService } from './services';

@Controller('game')
export class GameController {
	constructor(
		private readonly gameService: GameService,
		private readonly answerService: AnswerService,
		private readonly guessService: GuessService,
	) {}

	@Post()
	@ApiOperation({
		description: 'Create a new game of hangman.',
		operationId: 'start'
	})
	@ApiCreatedResponse({
		type: GameDto
	})
	public async startGame(): Promise<GameDto> {
		const game = await this.gameService.start();

		const answer = await this.answerService.find(game.answer);

		return {
			id: game.id,
			size: answer.value.length,
			clue: answer.clue,
			state: game.state
		} as GameDto;
	}

	@Get(':id')
	@ApiOperation({
		description: 'Gets the state of a hangman game.',
		operationId: 'get'
	})
	@ApiParam({
		description: 'The identifier for the game of hangman.',
		name: 'id'
	})
	@ApiOkResponse({
		type: GameDto
	})
	public async getGame(@Param('id') id: number): Promise<GameDto> {
		const game = await this.gameService.find(id);

		const answer = await this.answerService.find(game.answer);

		return {
			id: game.id,
			size: answer.value.length,
			clue: answer.clue,
			state: game.state
		} as GameDto;
	}

	@Post(':id/guess')
	@ApiOperation({
		description: 'Makes a guess for the game of hangman.',
		operationId: 'guess'
	})
	@ApiParam({
		description: 'The identifier for the game of hangman.',
		name: 'id'
	})
	@ApiOkResponse({
		type: GuessResponseDto
	})
	public async guess(
		@Param('id') id: number,
		@Body() body: GuessRequestDto,
	): Promise<GuessResponseDto> {
		const guess = await this.guessService.create(id, body.character);

		return {
			id: guess.id,
			gameId: id,
			character: guess.character,
			correct: guess.correct,
			positions: guess.positions
		} as GuessResponseDto;
	}

	@Get(':id/guess')
	@ApiOperation({
		description: 'Lists the guesses for the game of hangman.',
		operationId: 'guesses'
	})
	@ApiParam({
		description: 'The identifier for the game of hangman.',
		name: 'id'
	})
	@ApiOkResponse({
		type: [GuessResponseDto]
	})
	public async listGuesses(
		@Param('id') id: number,
	): Promise<GuessResponseDto[]> {
		const guesses = await this.guessService.find(id);

		return guesses.map(guess => {
			return {
				id: guess.id,
				gameId: id,
				character: guess.character,
				correct: guess.correct,
				positions: guess.positions
			};
		});
	}
}
