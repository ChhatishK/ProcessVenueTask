import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1700000000000 implements MigrationInterface {
  public async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE "book" (
        "id" SERIAL PRIMARY KEY,
        "title" varchar(255) NOT NULL,
        "author" varchar(255) NOT NULL,
        "createdAt" timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE "review" (
        "id" SERIAL PRIMARY KEY,
        "rating" int NOT NULL,
        "comment" text,
        "createdAt" timestamptz NOT NULL DEFAULT now(),
        "bookId" int NOT NULL REFERENCES "book"("id") ON DELETE CASCADE
      );
      CREATE INDEX "idx_reviews_bookId_createdAt" ON "review" ("bookId", "createdAt" DESC);
    `);
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.query('DROP INDEX IF EXISTS "idx_reviews_bookId_createdAt"');
    await q.query('DROP TABLE IF EXISTS "review"');
    await q.query('DROP TABLE IF EXISTS "book"');
  }
}
