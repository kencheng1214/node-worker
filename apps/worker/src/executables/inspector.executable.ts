import { Injectable } from '@nestjs/common';
import { PassThrough } from 'stream';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class Inspector implements Executable {
  execute(context: ExecutionContext, options?: Record<string, any>) {
    context.readStream = context.readStream.pipe(
      PassThrough.from(async function* (source: AsyncIterable<Buffer>) {
        for await (const value of source) {
          console.log(value);
          yield value;
        }
      }),
    );
  }
}
