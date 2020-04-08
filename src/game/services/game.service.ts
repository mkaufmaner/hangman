import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerService } from './answer.service';

import { Game } from '../../orm/entities';
import { GameState } from '../../orm/enums';

@Injectable()
export class GameService {
	constructor(
		@InjectRepository(Game)
		private gamesRepository: Repository<Game>,
		private answerService: AnswerService
	) {}

	/**
	 * Starts a new game.
	 */
	public async start(): Promise<Game> {
		const answer = await this.answerService.random();

		return this.gamesRepository.save({
			answer: answer.id
		});
	}

	/**
	 * Finds a game.
	 */
	public async find(id: number): Promise<Game> {
		return this.gamesRepository.findOne({
			where: {
				id
			}
		});
	}

	/**
	 * Game has been a failure.
	 */
	public async failed(id: number): Promise<void> {
		return this.updateState(id, GameState.FAILED);
	}

	/**
	 * Game was successful.
	 *
	 * @param id
	 */
	public async success(id: number): Promise<void> {
		return this.updateState(id, GameState.SUCCESS);
	}

	/**
	 * Update the state of a game.
	 */
	private async updateState(id: number, state: GameState): Promise<void> {
		await this.gamesRepository.update(
			{
				id
			},
			{
				state
			}
		);

		return;
	}
}
