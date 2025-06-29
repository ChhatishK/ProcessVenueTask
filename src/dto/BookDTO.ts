import { IsString } from 'class-validator';

export class BookCreateDTO {
  @IsString()
  title!: string;

  @IsString()
  author!: string;
}
