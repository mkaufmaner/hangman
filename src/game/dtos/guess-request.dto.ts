import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class GuessRequestDto {
	@ApiProperty({
		description: 'The character being guessed.'
	})
	@IsString()
	@MaxLength(1)
	@MinLength(1)
	public readonly character: string;
}
