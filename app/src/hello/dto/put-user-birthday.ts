import { ApiProperty } from '@nestjs/swagger';

export class PutUserBirthday {
  @ApiProperty({
    description: 'Pat date in YYYY-MM-DD format.',
  })
  dateOfBirth: string;
}
