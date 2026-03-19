import { createReadStream } from 'node:fs';
import { Injectable } from '@nestjs/common';
import { parse } from 'csv';
import split2 from 'split2';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class FileReader implements Executable {
  execute(
    context: ExecutionContext,
    options: {
      path: string;
      format?: 'text' | 'csv';
    },
  ) {
    const parser = (() => {
      switch (options?.format) {
        case 'csv':
          return parse();
        default:
          return split2();
      }
    })();

    context.readStream = createReadStream(options.path).pipe(parser);
  }
}
