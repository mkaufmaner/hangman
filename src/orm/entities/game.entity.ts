import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany
} from 'typeorm';

import { GameState } from '../enums/game-state.enum';
import { Answer } from './answer.entity';
import { Guess } from './guess.entity';

@Entity()
export class Game {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		update: false
	})
	@ManyToOne(() => Answer)
	answer: number;

	@Column({
		type: 'enum',
		enum: GameState,
		default: GameState.STARTED
	})
	state: GameState;

	@OneToMany(
		() => Guess,
		guess => guess.game,
	)
	guesses: Guess[];
}
