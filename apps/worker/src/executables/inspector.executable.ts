import { Injectable } from '@nestjs/common';
import { PassThrough } from 'stream';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class Inspector implements Executable {
  execute(context: ExecutionContext, options?: Record<string, any>) {
    context.readStream = context.readStream.pipe(
      PassThrough.from(async function* (lines: AsyncIterable<Buffer>) {
        for await (const line of lines) {
          console.log(line);
        }
      }),
    );
  }
}
