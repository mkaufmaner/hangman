import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SetupDto } from './setup.dto';
import { SetupService } from './setup.service';

@Controller('setup')
export class SetupController {
	constructor(private readonly setupService: SetupService) {}

	@Get()
	@ApiOperation({
		description: 'Populates the dictionary of possible hangman answers.',
		operationId: 'setup'
	})
	@ApiOkResponse({
		type: SetupDto
	})
	public async setup(): Promise<SetupDto> {
		await this.setupService.init();

		return {
			ok: true
		} as SetupDto;
	}
}
