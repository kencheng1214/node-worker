import { Injectable } from '@nestjs/common';
import { parse } from 'csv';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class CsvParser implements Executable {
  execute(context: ExecutionContext, options?: { columns?: boolean | string[] }) {
    context.readStream = context.readStream.pipe(parse({ columns: options?.columns }));
  }
}
