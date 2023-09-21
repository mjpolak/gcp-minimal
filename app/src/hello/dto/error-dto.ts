import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorDto {
  @ApiPropertyOptional({
    description: 'Error description',
  })
  errorDesc: string | undefined;

  @ApiProperty({
    description: 'Error code',
  })
  errorCode: string;
}
