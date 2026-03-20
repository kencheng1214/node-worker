import { Injectable } from '@nestjs/common';
import { parse } from 'csv';
import { Executable } from '../app.interface';
import { CsvParserOptions } from './csv-parser.schema';

@Injectable()
export class CsvParser implements Executable {
  execute(input: NodeJS.ReadableStream, options?: CsvParserOptions) {
    return input.pipe(parse({ columns: options?.columns }));
  }
}
