import 'dotenv/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.providers';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
