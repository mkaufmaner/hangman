import { Controller, Get } from '@nestjs/common';

import { IHealthz } from './healthz.interface';
import { HealthzService } from './healthz.service';
import { Healthz } from './healthz.dto';

import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('healthz')
export class HealthzController {
	constructor(private readonly healthzService: HealthzService) {}

	@Get('check')
	@ApiOperation({
		description: 'Checks to see if the service is running.',
		operationId: 'healthz'
	})
	@ApiOkResponse({
		type: Healthz
	})
	public healthCheck(): IHealthz {
		return this.healthzService.check();
	}
}
