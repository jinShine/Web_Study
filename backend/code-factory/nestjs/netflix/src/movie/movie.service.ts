import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';

@Injectable()
export class MovieService {
  private movies: Movie[] = [];

  constructor() {
    const movie1 = new Movie();

    movie1.id = 1;
    movie1.title = 'The Avengers';
    movie1.year = 2012;
    movie1.genre = 'fantasy';

    const movie2 = new Movie();

    movie2.id = 2;
    movie2.title = 'The Dark Knight';
    movie2.year = 2008;
    movie2.genre = 'action';

    this.movies.push(movie1, movie2);
  }

  getManyMovies(year?: string) {
    if (!year) {
      return this.movies;
    }

    return this.movies.filter((m) => m.year === +year);
  }

  getMovieById(id: number) {
    return this.movies.find((m) => m.id === id);
  }

  // createMovie(title: string, year: number, genre: string) {
  createMovie(createMovieDto: CreateMovieDto) {
    const movie = {
      id: this.movies.length + 1,
      title: createMovieDto.title,
      year: createMovieDto.year,
      genre: createMovieDto.genre,
    };

    this.movies.push(movie);

    return movie;
  }

  updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      throw new NotFoundException(`존재하지 않는 ID의 값의 영화입니다.`);
    }

    return Object.assign(movie, updateMovieDto);
  }

  deleteMovie(id: number) {
    const movieIndex = this.movies.findIndex((m) => m.id === +id);

    if (movieIndex === -1) {
      throw new NotFoundException(`존재하지 않는 ID의 값의 영화입니다.`);
    }

    this.movies.splice(movieIndex, 1);

    return id;
  }
}
