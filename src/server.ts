import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import AppDataSource from '../ormconfig';
import { bookRoutes } from './routes/bookRoutes';
import { reviewRoutes } from './routes/reviewRoutes';

dotenv.config();

async function start() {
  await AppDataSource.initialize();

  const app = express();
  app.use(express.json());

  const swaggerSpec = swaggerJSDoc({
    definition: {
      openapi: '3.1.0',
      info: { title: 'Book Review API', version: '1.0.0' },
    },
    apis: [],
  });

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use('/books', bookRoutes);
  app.use('/books/:bookId/reviews', reviewRoutes);

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
