import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Game } from './game.entity';

@Entity()
export class Guess {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		() => Game,
		game => game.guesses,
	)
	game: number;

	@Column({
		length: 1,
		update: false
	})
	character: string;

	@Column({
		update: false
	})
	correct: boolean;

	@Column({
		type: 'simple-array',
		update: false
	})
	positions: number[];
}
