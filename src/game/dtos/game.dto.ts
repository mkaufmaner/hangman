import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum, IsString } from 'class-validator';

import { GameState } from '../../orm/enums';

export class GameDto {
	@ApiProperty({
		description: 'The identifier for the game.'
	})
	@IsNumber()
	public readonly id: number;

	@ApiProperty({
		description: 'The size of the answer.'
	})
	@IsNumber()
	public readonly size: number;

	@ApiProperty({
		description: 'A clue leading to the answer.'
	})
	@IsString()
	public readonly clue: string;

	@ApiProperty({
		description: 'The state of the game.',
		enum: GameState
	})
	@IsEnum(GameState)
	public readonly state: GameState;
}
