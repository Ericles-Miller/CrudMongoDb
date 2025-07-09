import { InternalServerErrorException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new InternalServerErrorException('MONGO_URI Error to connect to database.');
}

export const DatabaseModule = MongooseModule.forRoot(mongoUri);
