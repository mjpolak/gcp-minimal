import { Module } from '@nestjs/common';
import { FirestoreRepository } from './hello/firestore-repository';
import { HelloController } from './hello/hello.controller';
import { HelloService } from './hello/hello.service';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService, FirestoreRepository],
})
export class AppModule {}
