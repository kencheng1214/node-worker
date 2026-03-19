import { Injectable } from '@nestjs/common';
import { parse } from 'csv';
import { Executable, ExecutionContext } from '../app.interface';
import { slice } from '../utils/stream.util';

@Injectable()
export class CsvParser implements Executable {
  execute(context: ExecutionContext, options?: Record<string, any>) {
    context.readStream = context.readStream.pipe(slice()).pipe(parse());
  }
}
