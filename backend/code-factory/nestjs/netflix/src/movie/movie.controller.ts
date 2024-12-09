import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieTitleValidationPipe } from './pipe/movie-title-validation.pipe';

@Controller('movie')
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies(@Query('title', MovieTitleValidationPipe) title?: string) {
    return this.movieService.findAll(title);
  }

  // @Get('/:id')
  // getMovie(@Param('id') id: string) {
  //   return this.movieService.findOne(+id);
  // }

  @Get('/:id')
  getMovie(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory(error) {
          throw new BadRequestException('숫자를 입력해주세요.', error);
        },
      }),
    )
    id: number,
  ) {
    return this.movieService.findOne(id);
  }

  @Post()
  postMovie(
    // @Body('title') title: string,
    // @Body('year') year: number,
    // @Body('genre') genre: string,
    @Body() body: CreateMovieDto,
  ) {
    // return this.movieService.createMovie(title, year, genre);
    return this.movieService.create(body);
  }

  @Patch(':id')
  patchMovie(
    @Param('id', ParseIntPipe) id: number,
    // @Body('year') year: number,
    // @Body('genre') genre: string,
    @Body() body: UpdateMovieDto,
  ) {
    return this.movieService.update(id, body);
  }

  // Put은 업데이트 하려다가 없으면 생성하는 방식

  // 삭제할때는 일반적으로 변경된 값을 전체적으로 반환하지 않는다.
  // 일반적으로 삭제한 id만 반환한다.
  @Delete(':id')
  deleteMovie(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.remove(id);
  }
}
