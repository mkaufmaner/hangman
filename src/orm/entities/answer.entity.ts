import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		update: false,
		unique: true
	})
	value: string;

	@Column()
	clue: string;
}
