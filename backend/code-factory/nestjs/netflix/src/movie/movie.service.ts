import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async getManyMovies(title?: string) {
    // 나중에 title 필터 기능 추가하기
    if (!title) {
      return await this.movieRepository.find();
    }

    return await this.movieRepository.findAndCount({
      where: {
        title: Like(`%${title}%`),
      },
    });

    // if (!year) {
    //   return this.movies;
    // }
    // return this.movies.filter((m) => m.year === +year);
  }

  async getMovieById(id: number) {
    return await this.movieRepository.findOne({
      where: {
        id,
      },
    });

    // return this.movies.find((m) => m.id === id);
  }

  // createMovie(title: string, year: number, genre: string) {
  async createMovie(createMovieDto: CreateMovieDto) {
    // await this.movieRepository.create(createMovieDto);
    return await this.movieRepository.save(createMovieDto);

    // const movie = {
    //   id: this.movies.length + 1,
    //   title: createMovieDto.title,
    //   year: createMovieDto.year,
    //   genre: createMovieDto.genre,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   version: 0,
    // };

    // this.movies.push(movie);

    // return movie;
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`존재하지 않는 ID의 값의 영화입니다.`);
    }

    await this.movieRepository.update({ id }, updateMovieDto);

    return await this.movieRepository.findOne({ where: { id } });

    // const movie = this.movies.find((m) => m.id === +id);

    // if (!movie) {
    //   throw new NotFoundException(`존재하지 않는 ID의 값의 영화입니다.`);
    // }

    // return Object.assign(movie, updateMovieDto);
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`존재하지 않는 ID의 값의 영화입니다.`);
    }

    await this.movieRepository.delete(id);

    // const movieIndex = this.movies.findIndex((m) => m.id === +id);

    // if (movieIndex === -1) {
    //   throw new NotFoundException(`존재하지 않는 ID의 값의 영화입니다.`);
    // }

    // this.movies.splice(movieIndex, 1);

    return id;
  }
}
