import { ApiProperty } from '@nestjs/swagger';

export class GetResponseDto {
  @ApiProperty()
  message: string;
}
