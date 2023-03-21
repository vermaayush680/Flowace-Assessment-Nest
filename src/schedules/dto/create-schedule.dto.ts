import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {

	@ApiProperty()
	user_id: number;

	@ApiProperty()
	startTime: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	createdAt: string;

	@ApiProperty()
	updatedAt: string;

	@ApiProperty()
	endTime: string;

	@ApiProperty()
	date: string;

}
