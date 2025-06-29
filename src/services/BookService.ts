import AppDataSource from '../../ormconfig';
import { Book } from '../entities/Book';
import { BookCreateDTO } from '../dto/BookDTO';
import { Review } from '../entities/Review';
import { ReviewCreateDTO } from '../dto/ReviewDTO';

export async function listBooks() {
  return AppDataSource.getRepository(Book).find({ relations: { reviews: true } });
}

export async function createBook(dto: BookCreateDTO) {
  const repo = AppDataSource.getRepository(Book);
  const book = repo.create(dto);
  return repo.save(book);
}

export async function getBook(id: number) {
  return AppDataSource.getRepository(Book).findOne({ where: { id } });
}

export async function listReviews(bookId: number) {
  return AppDataSource.getRepository(Review).find({
    where: { book: { id: bookId } },
    order: { createdAt: 'DESC' },
  });
}

export async function createReview(bookId: number, dto: ReviewCreateDTO) {
  const repo = AppDataSource.getRepository(Review);
  const review = repo.create({ ...dto, book: { id: bookId } as Book });
  return repo.save(review);
}
