import { Injectable } from '@nestjs/common';
import { parse } from 'csv';
import { Executable, PipelineContext } from '../../app.interface';
import { CsvParserOptions } from './csv-parser.schema';

@Injectable()
export class CsvParser implements Executable {
  execute(input: NodeJS.ReadableStream, context: PipelineContext, options?: CsvParserOptions) {
    return input.pipe(parse({ columns: options?.columns }));
  }
}
