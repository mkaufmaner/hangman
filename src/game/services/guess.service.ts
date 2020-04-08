import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Game, Guess, Answer } from '../../orm/entities';
import { AnswerService } from './answer.service';
import { GameService } from './game.service';

@Injectable()
export class GuessService {
	constructor(
		@InjectRepository(Guess)
		private guessRepository: Repository<Guess>,
		private answerService: AnswerService,
		private gameService: GameService,
	) {}

	/**
	 * Creates a new guess
	 *
	 * @param id The game id.
	 */
	public async find(id: number): Promise<Guess[]> {
		// get all guesses
		return this.guessRepository.find({
			where: {
				game: id
			},
			order: {
				id: 'ASC'
			}
		});
	}

	/**
	 * Creates a new guess
	 *
	 * @param id The game id.
	 * @param character The character being guessed.
	 */
	public async create(id: number, character: string): Promise<Guess> {
		// get the game and associated answer
		const game = await this.gameService.find(id);
		const answer = await this.answerService.find(game.answer);

		// get positions
		const positions = this.findCharacterPositions(answer, character);

		// do we have positions?
		let correct: boolean;
		if (positions.length > 0) {
			correct = true;
		} else {
			correct = false;
		}

		await this.verifyExisting(game.id, character);

		// create guess
		const guess = await this.guessRepository.save({
			game: game.id,
			character,
			correct,
			positions
		});

		// update the game state
		await this.checkGameState(game, answer);

		return guess;
	}

	/**
	 * Updates the game state.
	 *
	 *
	 */
	public async checkGameState(game: Game, answer: Answer): Promise<void> {
		// find all guesses
		const guesses = await this.find(game.id);

		// get the number of incorrect guesses
		const incorrect = _.filter(guesses, ['correct', false]);

		if (incorrect.length > 10) {
			this.gameService.failed(game.id);
		} else {
			// find the correct ones
			const positions = _.flatten(_.map(_.filter(guesses, 'correct'), 'positions'));

			// we were successful
			if (positions.length === answer.value.length) {
				this.gameService.success(game.id);
			}
		}

		return;
	}

	/**
	 * Verifies that the existing character hasen't already been guessed for a game.
	 */
	private async verifyExisting(id: number, character: string): Promise<void> {
		const guessCount = await this.guessRepository.count({
			where: {
				game: id,
				character
			}
		});

		if (guessCount > 0) {
			throw new Error('Character has already been guessed.');
		}

		return;
	}

	/**
	 * Finds the character positions within an answer.
	 *
	 * @param answer
	 * @param character
	 */
	private findCharacterPositions(
		answer: Answer,
		character: string,
	): number[] {
		const characters = _.split(answer.value, '');

		return _.reduce(
			characters,
			(result, value, key) => {
				if (value === character) {
					result.push(key);
				}

				return result;
			},
			[],
		);
	}
}
