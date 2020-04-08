import { ApiProperty } from '@nestjs/swagger';
import {
	IsString,
	MaxLength,
	MinLength,
	IsBoolean,
	IsNumber
} from 'class-validator';

export class GuessResponseDto {
	@ApiProperty({
		description: 'The identifier of the guess.'
	})
	@IsNumber()
	public readonly id: number;

	@ApiProperty({
		description: 'The identifier for the game.'
	})
	@IsNumber()
	public readonly gameId: number;

	@ApiProperty({
		description: 'The character that was guessed.'
	})
	@IsString()
	@MaxLength(1)
	@MinLength(1)
	public readonly character: string;

	@ApiProperty({
		description: 'True if the guess was correct.'
	})
	@IsBoolean()
	public readonly correct: boolean;

	@ApiProperty({
		description:
			'The position or positions of the character within the value of the answer.'
	})
	@IsNumber(
		{},
		{
			each: true
		},
	)
	public readonly positions: number[];
}
