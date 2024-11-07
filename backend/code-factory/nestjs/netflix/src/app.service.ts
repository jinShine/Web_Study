import { Injectable, NotFoundException } from '@nestjs/common';

export interface Movie {
  id: number;
  title: string;
  year: number;
}

@Injectable()
export class AppService {}
