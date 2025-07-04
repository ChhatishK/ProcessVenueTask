import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1751189497112 implements MigrationInterface {
    name = 'InitSchema1751189497112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "comment" text, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "bookId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_reviews_bookId_createdAt" ON "review" ("bookId", "createdAt") `);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP INDEX "public"."idx_reviews_bookId_createdAt"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
