import { Exclude, Transform } from 'class-transformer';

export class Movie {
  id: number;
  title: string;
  year: number;

  @Transform(({ value }) => {
    console.log(value);
    return value.toUpperCase();
  })
  genre: string;
}
