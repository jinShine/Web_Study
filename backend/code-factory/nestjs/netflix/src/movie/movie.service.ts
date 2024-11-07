import { Injectable, NotFoundException } from '@nestjs/common';

export interface Movie {
  id: number;
  title: string;
  year: number;
}

@Injectable()
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'The Avengers',
      year: 2012,
    },
    {
      id: 2,
      title: 'The Dark Knight',
      year: 2008,
    },
  ];

  getManyMovies(year?: string) {
    if (!year) {
      return this.movies;
    }

    return this.movies.filter((m) => m.year === +year);
  }

  getMovieById(id: number) {
    return this.movies.find((m) => m.id === id);
  }

  createMovie(title: string, year: number) {
    const movie = {
      id: this.movies.length + 1,
      title,
      year,
    };

    this.movies.push(movie);

    return movie;
  }

  updateMovie(id: number, year: number) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      throw new NotFoundException(`존재하지 않는 ID의 값의 영화입니다.`);
    }

    return Object.assign(movie, { year });
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
