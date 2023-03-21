import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

	@ApiProperty()
	name: string;

	@ApiProperty()
	createdAt: string;

	@ApiProperty()
	updatedAt: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	password: string;
}
