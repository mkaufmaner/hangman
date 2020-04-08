import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Answer } from '../orm/entities';

import dictionary from './dictionary';

@Injectable()
export class SetupService {
	constructor(
		@InjectRepository(Answer)
		private answersRepository: Repository<Answer>,
	) {}

	/**
	 * Setup the system by populating the dictionary of answers.
	 */
	public async init(): Promise<void> {
		await this.answersRepository.insert(dictionary);

		return;
	}
}
