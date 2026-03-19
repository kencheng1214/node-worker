import { Injectable } from '@nestjs/common';
import { parse } from 'csv';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class CsvParser implements Executable {
  execute(context: ExecutionContext, options?: Record<string, any>) {
    context.readStream.pipe(parse());
  }
}
