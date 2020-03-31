import { Injectable } from '@nestjs/common';
import { IHealthz } from './healthz.interface';

@Injectable()
export class HealthzService {
	public check(): IHealthz {
		return {
			ok: true
		};
	}
}
