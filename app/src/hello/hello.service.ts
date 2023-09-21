import { Injectable } from '@nestjs/common';
import { ErrorDto } from './dto/error-dto';
import { FirestoreRepository } from './firestore-repository';

const msPerDay = 1000 * 60 * 60 * 24;
@Injectable()
export class HelloService {
  constructor(private repository: FirestoreRepository) {}

  async setBirthday(username: string, date: Date): Promise<null | ErrorDto> {
    if (new Date().getTime() <= date.getTime()) {
      return {
        errorCode: 'not_alive',
        errorDesc: 'Sorry, you are not alive yet.',
      };
    }
    this.repository.setBirthday(username, date);

    return null;
  }

  async getBirthdayMessage(username: string): Promise<string> {
    const birthdate = await this.repository.getBirthday(username);
    return this.generateBirthdayMessage(username, birthdate, new Date());
  }

  generateBirthdayMessage(
    username: string,
    birthdate: Date | null,
    currentDate: Date,
  ): string {
    if (birthdate == null) {
      return `Hello ${username}, I don't know date of your birthday :(`;
    }

    const dayDiff = this.countDaysToBirthdayFromDate(birthdate, currentDate);

    if (dayDiff == 0) {
      return `Hello ${username}, Happy birthday!`;
    } else {
      return `Hello, ${username}! Your birthday is in ${dayDiff} day(s)`;
    }
  }

  countDaysToBirthdayFromDate(birthdate: Date, date: Date) {
    const nextBirthdate = this.getBirthdateAfterDate(birthdate, date);

    const diff = Math.floor(
      (nextBirthdate.getTime() - date.getTime()) / msPerDay,
    );
    return diff;
  }

  getBirthdateAfterDate(birthdate: Date, date: Date) {
    const year = date.getFullYear();
    const birthDateDate = birthdate.getDate();

    const thisYearBirthdate = new Date(
      year,
      birthdate.getMonth(),
      birthDateDate,
    );
    const nextBirthdate = new Date(
      year + (birthDateDate == 29 ? 4 - (year % 4) : 1),
      birthdate.getMonth(),
      birthDateDate,
    );

    if (thisYearBirthdate.getTime() >= date.getTime()) {
      return thisYearBirthdate;
    } else return nextBirthdate;
  }
}
