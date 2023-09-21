import { Firestore } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { SerializationFormat } from './dto/serialization-format';

@Injectable()
export class FirestoreRepository {
  private client: Firestore;

  constructor() {
    this.client = new Firestore();
  }

  async setBirthday(username: string, date: Date) {
    const document = this.client.doc('birthday/' + username);
    const record: SerializationFormat = { date: date.toISOString() };
    await document.set(record);
  }

  async getBirthday(username: string): Promise<null | Date> {
    const document = this.client.doc('birthday/' + username);
    const value = await document.get();

    if (!value?.exists) {
      return null;
    }
    const record = value.data() as SerializationFormat;
    return new Date(record.date);
  }
}
