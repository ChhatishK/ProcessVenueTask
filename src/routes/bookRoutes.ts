import { Router } from 'express';
import { validate } from '../utils/validate';
import { BookCreateDTO } from '../dto/BookDTO';
import { createBook, listBooks } from '../services/BookService';
import { getBooksCache, setBooksCache } from '../utils/cache';

export const bookRoutes = Router();

bookRoutes.get('/', async (_req, res) => {
  const cached = await getBooksCache();
  if (cached) return res.json(cached);

  const books = await listBooks();
  await setBooksCache(books);
  res.json(books);
});

bookRoutes.post('/', validate(BookCreateDTO), async (req, res) => {
  const book = await createBook(req.body);
  await setBooksCache(null);
  res.status(201).json(book);
});
