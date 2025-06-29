import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, CreateDateColumn } from 'typeorm';
import { Book } from './Book';

@Entity()
@Index('idx_reviews_bookId_createdAt', ['book', 'createdAt'])
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  rating!: number;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @ManyToOne(() => Book, (book) => book.reviews, { onDelete: 'CASCADE' })
  book!: Book;
}
