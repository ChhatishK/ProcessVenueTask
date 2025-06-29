import { DataSource } from 'typeorm';
import { Book } from './src/entities/Book';
import { Review } from './src/entities/Review';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [Book, Review],
  migrations: ['./src/migrations/*.ts'],
});

export default AppDataSource;
