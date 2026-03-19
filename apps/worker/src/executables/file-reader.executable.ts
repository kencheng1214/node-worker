import { createReadStream } from 'node:fs';
import { Injectable } from '@nestjs/common';
import { parse } from 'csv';
import split2 from 'split2';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class FileReader implements Executable {
  execute(
    context: ExecutionContext,
    options?: {
      parser?: 'line' | 'csv';
    },
  ) {
    if (!context.path) throw new Error();

    const parser = (() => {
      switch (options.parser) {
        case 'csv':
          return parse();
        default:
          return split2();
      }
    })();

    context.readStream = createReadStream(context.path).pipe(parser);
  }
}
