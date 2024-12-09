import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entity/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Like, Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from 'src/director/entity/director.entity';
import { Genre } from 'src/genre/entities/genre.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieDetail)
    private readonly movieDetailRepository: Repository<MovieDetail>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(title?: string) {
    // if (!title) {
    //   return await this.movieRepository.find({
    //     relations: ['director', 'genres'],
    //   });
    // }

    // return await this.movieRepository.findAndCount({
    //   where: {
    //     title: Like(`%${title}%`),
    //   },
    //   relations: ['director', 'genres'],
    // });

    // Query Builder
    const qb = await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.director', 'director')
      .leftJoinAndSelect('movie.genres', 'genres');

    if (title) {
      qb.where('movie.title LIKE :title', { title: `%${title}` });
    }

    return qb.getManyAndCount();
  }

  async findOne(id: number) {
    // return await this.movieRepository.findOne({
    //   where: {
    //     id,
    //   },
    //   relations: ['detail', "director', 'genres'],
    // });

    const qb = await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.detail', 'detail')
      .leftJoinAndSelect('movie.director', 'director')
      .leftJoinAndSelect('movie.genres', 'genres')
      .where('movie.id = :id', { id });

    return await qb.getOne();
  }

  // createMovie(title: string, year: number, genre: string) {
  async create(createMovieDto: CreateMovieDto) {
    const qr = this.dataSource.createQueryRunner();

    await qr.connect();
    await qr.startTransaction(); // IsolationLevel 설정 가능(default: ReadCommitted)

    try {
      const director = await qr.manager.findOne(Director, {
        where: { id: createMovieDto.directorId },
      });
      // const director = await this.directorRepository.findOne({
      //   where: { id: createMovieDto.directorId },
      // });

      if (!director) {
        throw new NotFoundException(`존재하지 않는 ID의 값의 감독입니다.`);
      }

      // const genres = await this.genreRepository.find({
      //   where: { id: In(createMovieDto.genreIds) },
      // });

      const genres = await qr.manager.find(Genre, {
        where: { id: In(createMovieDto.genreIds) },
      });

      if (genres.length !== createMovieDto.genreIds.length) {
        throw new NotFoundException(
          `존재하지 않는 ID의 값의 장르입니다. ids -> ${genres.map((genre) => genre.id).join(',')}`,
        );
      }

      qr.commitTransaction();

      // return await this.movieRepository.save({
      return await qr.manager.save(Movie, {
        title: createMovieDto.title,
        year: createMovieDto.year,
        detail: {
          description: createMovieDto.detail,
        },
        director,
        genres,
      });
    } catch (e) {
      qr.rollbackTransaction();

      throw e;
    } finally {
      await qr.release();
    }
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      const movie = await qr.manager.findOne(Movie, {
        where: { id },
        relations: ['detail'],
      });

      if (!movie) {
        throw new NotFoundException(`존재하지 않는 ID의 값의 영화입니다.`);
      }

      const { detail, directorId, genreIds, ...movieRest } = updateMovieDto;

      let newDirector;

      if (directorId) {
        const director = await qr.manager.findOne(Director, {
          where: { id: directorId },
        });

        if (!director) {
          throw new NotFoundException(`존재하지 않는 ID의 값의 감독입니다.`);
        }

        newDirector = director;
      }

      let newGenres;

      if (genreIds) {
        const genres = await qr.manager.find(Genre, {
          where: { id: In(genreIds) },
        });

        if (genres.length !== updateMovieDto.genreIds.length) {
          throw new NotFoundException(
            `존재하지 않는 ID의 값의 장르입니다. ids -> ${genres.map((genre) => genre.id).join(',')}`,
          );
        }

        newGenres = genres;
      }

      const movieUpdateFields = {
        ...movieRest,
        ...(newDirector && { director: newDirector }),
      };

      await qr.manager.update(Movie, { id }, movieUpdateFields);

      if (detail) {
        await qr.manager.update(
          MovieDetail,
          { id: movie.detail.id },
          { description: detail },
        );
      }

      const newMovie = await qr.manager.findOne(Movie, {
        where: { id },
        relations: ['detail', 'director', 'genres'],
      });

      newMovie.genres = newGenres;
      await qr.manager.save(Movie, newMovie);

      await qr.commitTransaction();

      return await qr.manager.findOne(Movie, {
        where: { id },
        relations: ['detail', 'director', 'genres'],
      });
    } catch (e) {
      qr.rollbackTransaction();
      throw e;
    } finally {
      await qr.release();
    }
  }

  async remove(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['detail'],
    });

    if (!movie) {
      throw new NotFoundException(`존재하지 않는 ID의 값의 영화입니다.`);
    }

    await this.movieRepository.delete(id);
    await this.movieDetailRepository.delete({ id: movie.detail.id });

    return id;
  }
}
