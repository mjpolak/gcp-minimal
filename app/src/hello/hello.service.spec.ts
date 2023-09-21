import { Test, TestingModule } from '@nestjs/testing';
import { HelloService } from './hello.service';
import { FirestoreRepository } from './firestore-repository';

describe('HelloService', () => {
  let service: HelloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloService, FirestoreRepository],
    })
      .overrideProvider(FirestoreRepository)
      .useValue({})
      .compile();

    service = module.get<HelloService>(HelloService);
  });

  describe('getBirthdateAfterDate', () => {
    // test cases, [birthday, date, next birthday after date]
    const cases = [
      [new Date(1988, 9, 2), new Date(2023, 8, 21), new Date(2023, 9, 2)],
      [new Date(1988, 9, 2), new Date(2023, 9, 3), new Date(2024, 9, 2)],
      [new Date(2020, 1, 29), new Date(2024, 0, 2), new Date(2024, 1, 29)],
      [new Date(2020, 1, 29), new Date(2024, 2, 2), new Date(2028, 1, 29)],
    ];
    test.each(cases)(
      'given birthday %p next birthday after %p is %p',
      (birthday, date, result) => {
        expect(service.getBirthdateAfterDate(birthday, date)).toEqual(result);
      },
    );
  });

  describe('countDaysToBirthdayFromDate', () => {
    // test cases, [birthday, date, num of days to next birthday]
    const cases: [Date, Date, number][] = [
      [new Date(1988, 9, 2), new Date(2023, 8, 21), 11],
      [new Date(1988, 9, 2), new Date(2023, 9, 3), 365],
      [new Date(1988, 9, 2), new Date(2023, 9, 2), 0],
      [new Date(2020, 1, 29), new Date(2024, 0, 2), 58],
      [new Date(2020, 1, 29), new Date(2024, 2, 2), 1459],
      [new Date(2020, 1, 29), new Date(2024, 1, 29), 0],
    ];
    test.each(cases)(
      'given birthday %p assuming date %p there is %p days to birtdays',
      (birthday, date, result) => {
        expect(service.countDaysToBirthdayFromDate(birthday, date)).toEqual(
          result,
        );
      },
    );
  });

  describe('generateBirthdayMessage', () => {
    // test cases, [username, birthday, date, message]
    const cases: [string, Date, Date, string][] = [
      [
        'userA',
        new Date(2020, 1, 29),
        new Date(2024, 0, 2),
        'Hello, userA! Your birthday is in 58 day(s)',
      ],
      [
        'userB',
        new Date(2020, 1, 29),
        new Date(2024, 2, 2),
        'Hello, userB! Your birthday is in 1459 day(s)',
      ],
      [
        'userC',
        new Date(2020, 1, 29),
        new Date(2024, 1, 29),
        'Hello userC, Happy birthday!',
      ],
      [
        'userD',
        null,
        new Date(2024, 0, 2),
        "Hello userD, I don't know date of your birthday :(",
      ],
    ];
    test.each(cases)(
      'for user %p given birthday %p message at day %p is %p',
      (username, birthday, date, result) => {
        expect(
          service.generateBirthdayMessage(username, birthday, date),
        ).toEqual(result);
      },
    );
  });
});
