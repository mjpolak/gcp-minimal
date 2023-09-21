import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';
import { FirestoreRepository } from './firestore-repository';
import { ErrorDto } from './dto/error-dto';

describe('HelloController', () => {
  let controller: HelloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloService, FirestoreRepository],
      controllers: [HelloController],
    })
      .overrideProvider(FirestoreRepository)
      .useValue({})
      .overrideProvider(HelloService)
      .useValue({})
      .compile();

    controller = module.get<HelloController>(HelloController);
  });

  describe('date string validation', () => {
    // test cases, [string,null]
    const cases: [any, ErrorDto | null][] = [
      ['1988-09-02', null],
      [5, { errorDesc: 'not a string', errorCode: 'not_string' }],
      [null, { errorDesc: 'not a string', errorCode: 'not_string' }],
      [
        '1988-09-32',
        { errorDesc: 'is not valid date', errorCode: 'invalid_date' },
      ],
      [
        '1988-9-3',
        {
          errorDesc: 'is not in YYYY-MM-DD format',
          errorCode: 'invalid_format',
        },
      ],
    ];
    test.each(cases)(
      'given string %p error code should be %p',
      (input, expectedOutput) => {
        if (expectedOutput == null) {
          expect(controller.validateDateString(input)).toBeNull();
        } else {
          expect(controller.validateDateString(input)).toMatchObject(
            expectedOutput,
          );
        }
      },
    );
  });
});
