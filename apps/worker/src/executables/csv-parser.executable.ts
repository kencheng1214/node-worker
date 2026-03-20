import { Injectable } from '@nestjs/common';
import { parse } from 'csv';
import { Executable, ExecutionContext } from '../app.interface';
import { trim } from '../utils/stream.util';

@Injectable()
export class CsvParser implements Executable {
  execute(
    context: ExecutionContext,
    options?: { columns?: boolean | string[]; trim?: { start?: number; end?: number } },
  ) {
    context.readStream = context.readStream.pipe(trim(options?.trim)).pipe(parse({ columns: options?.columns }));
  }
}
