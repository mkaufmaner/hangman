import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Answer } from '../../orm/entities';

@Injectable()
export class AnswerService {
	constructor(
		@InjectRepository(Answer)
		private answersRepository: Repository<Answer>,
	) {}

	/**
	 * Finds an answer.
	 *
	 * @param id The answer id.
	 */
	public async find(id: number): Promise<Answer> {
		return this.answersRepository.findOne({
			where: {
				id
			}
		});
	}

	/**
	 * Gets the size of an answer.
	 *
	 * @param id The answer id.
	 */
	public async size(id: number): Promise<number> {
		const answer = await this.answersRepository.findOne({
			select: ['value'],
			where: {
				id
			}
		});

		return answer.value.length;
	}

	/**
	 * Find a new answer for a game.
	 */
	public async random(): Promise<Answer> {
		// count the number of answers
		const count = await this.answersRepository.count({
			cache: 60000 // 1 minute
		});

		// randomly skip
		const skip = _.random(0, count - 1);

		// get answers
		const answers = await this.answersRepository.find({
			order: {
				id: 'ASC'
			},
			take: 1,
			skip
		});

		// there will only be one
		return answers[0];
	}
}
