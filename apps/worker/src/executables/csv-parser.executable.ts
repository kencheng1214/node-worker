import { Injectable } from '@nestjs/common';
import { parse } from 'csv';
import { Executable } from '../app.interface';

@Injectable()
export class CsvParser implements Executable {
  execute(input: any, options?: { columns?: boolean | string[] }) {
    return input.pipe(parse({ columns: options?.columns }));
  }
}
