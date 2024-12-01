import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { title } from 'process';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies(@Query('title') title?: string) {
    return this.movieService.getManyMovies(title);
  }

  @Get('/:id')
  getMovie(@Param('id') id: string) {
    return this.movieService.getMovieById(+id);
  }

  @Post()
  postMovie(
    // @Body('title') title: string,
    // @Body('year') year: number,
    // @Body('genre') genre: string,
    @Body() body: CreateMovieDto,
  ) {
    // return this.movieService.createMovie(title, year, genre);
    return this.movieService.createMovie(body);
  }

  @Patch(':id')
  patchMovie(
    @Param('id') id: string,
    // @Body('year') year: number,
    // @Body('genre') genre: string,
    @Body() body: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(+id, body);
  }

  // Put은 업데이트 하려다가 없으면 생성하는 방식

  // 삭제할때는 일반적으로 변경된 값을 전체적으로 반환하지 않는다.
  // 일반적으로 삭제한 id만 반환한다.
  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(+id);
  }
}
