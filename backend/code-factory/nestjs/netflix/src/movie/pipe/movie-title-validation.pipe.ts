import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MovieTitleValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    // 만약에 글자 길이가 2보다 작으면 에러 던지기!

    if (!value) {
      return value;
    }

    if (value.length <= 2) {
      throw new BadRequestException('제목은 2글자 이상이어야 합니다.');
    }

    return value;
  }
}
