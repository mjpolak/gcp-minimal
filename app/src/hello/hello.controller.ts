import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from './dto/error-dto';
import { PutUserBirthday } from './dto/put-user-birthday';
import { HelloService } from './hello.service';
import { GetResponseDto } from './dto/get-response';

@Controller('hello')
export class HelloController {
  constructor(private helloService: HelloService) {}

  @Put(':username')
  @ApiParam({
    name: 'username',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Data saved.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
    type: [ErrorDto],
  })
  async create(
    @Body() createUserDto: PutUserBirthday,
    @Param('username') username: string,
  ) {
    const dateValidationError = this.validateDateString(
      createUserDto?.dateOfBirth,
    );
    const usernameValidationError = this.validateUsername(username);

    const errors = [dateValidationError, usernameValidationError].filter(
      (x) => x != null,
    );

    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    const error = await this.helloService.setBirthday(
      username,
      new Date(createUserDto.dateOfBirth),
    );
    if (error) {
      throw new HttpException([error], HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':username')
  @ApiParam({
    name: 'username',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Result',
    type: GetResponseDto,
  })
  async get(@Param('username') username: string): Promise<GetResponseDto> {
    const usernameValidationError = this.validateUsername(username);

    const errors = [usernameValidationError].filter((x) => x != null);

    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    const message = await this.helloService.getBirthdayMessage(username);
    return {
      message,
    };
  }

  validateDateString(input: string | null): ErrorDto | null {
    if (!input || typeof input != 'string') {
      return { errorDesc: 'not a string', errorCode: 'not_string' };
    }
    const regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    if (input.match(regex) == null) {
      return {
        errorDesc: 'is not in YYYY-MM-DD format',
        errorCode: 'invalid_format',
      };
    }

    const [y, m, d] = input.split('-').map((x) => parseInt(x, 10));

    // -1 for month as js use 0-based month enumertion
    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() != y ||
      date.getMonth() != m - 1 ||
      date.getDate() != d
    ) {
      return { errorDesc: 'is not valid date', errorCode: 'invalid_date' };
    }

    return null;
  }

  validateUsername(input: string | null): ErrorDto | null {
    const regex = /^[a-zA-Z]+$/;
    if (input.match(regex) == null) {
      return {
        errorDesc: 'username must contain only letters',
        errorCode: 'wrong_username',
      };
    }
    return null;
  }
}
