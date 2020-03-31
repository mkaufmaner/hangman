import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class Healthz {
	@ApiProperty({
		description: 'True if the service is running.'
	})
	@IsBoolean()
	public readonly ok: boolean;
}
