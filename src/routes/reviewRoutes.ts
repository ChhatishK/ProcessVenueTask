import { Router } from 'express';
import { validate } from '../utils/validate';
import { ReviewCreateDTO } from '../dto/ReviewDTO';
import { getBook, listReviews, createReview } from '../services/BookService';

export const reviewRoutes = Router({ mergeParams: true });

reviewRoutes.get('/', async (req, res) => {
  const bookId = +req.params.bookId;
  if (!(await getBook(bookId))) return res.status(404).json({ message: 'Book not found' });
  res.json(await listReviews(bookId));
});

reviewRoutes.post('/', validate(ReviewCreateDTO), async (req, res) => {
  const bookId = +req.params.bookId;
  if (!(await getBook(bookId))) return res.status(404).json({ message: 'Book not found' });
  const review = await createReview(bookId, req.body);
  res.status(201).json(review);
});
