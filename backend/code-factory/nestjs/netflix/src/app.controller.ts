import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

interface Movie {
  id: number;
  title: string;
  year: number;
}

@Controller('movie')
export class AppController {
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

  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies(@Query('year') year?: string) {
    if (!year) {
      return this.movies;
    }

    return this.movies.filter((m) => m.year === +year);
  }

  @Get('/:id')
  getMovie(@Param('id') id: string) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      // throw new Error('존재하지 않는 ID의 값의 영화입니다.');
      throw new NotFoundException(`존재하지 않는 ID의 값의 영화입니다.`);
    }

    return movie;
  }

  @Post()
  postMovie(@Body('title') title: string, @Body('year') year: number) {
    const movie = {
      id: this.movies.length + 1,
      title,
      year,
    };

    this.movies.push(movie);

    return movie;
  }

  @Patch(':id')
  patchMovie(@Param('id') id: string, @Body('year') year: number) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      throw new NotFoundException(`존재하지 않는 ID의 값의 영화입니다.`);
    }

    return Object.assign(movie, { year });
  }

  // Put은 업데이트 하려다가 없으면 생성하는 방식

  // 삭제할때는 일반적으로 변경된 값을 전체적으로 반환하지 않는다.
  // 일반적으로 삭제한 id만 반환한다.
  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    const movieIndex = this.movies.findIndex((m) => m.id === +id);

    if (movieIndex === -1) {
      throw new NotFoundException(`존재하지 않는 ID의 값의 영화입니다.`);
    }

    this.movies.splice(movieIndex, 1);

    return id;
  }
}
