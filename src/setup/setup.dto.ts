import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class SetupDto {
	@ApiProperty({
		description: 'True if the setup was successful.'
	})
	@IsBoolean()
	public readonly ok: boolean;
}
