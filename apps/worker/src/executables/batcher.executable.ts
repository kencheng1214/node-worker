import { Transform } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class Batcher implements Executable {
  execute(context: ExecutionContext, options?: { size?: number }) {
    const size = options?.size ?? 0;

    context.readStream = context.readStream.pipe(
      Transform.from(async function* (source: AsyncIterable<Buffer>) {
        let buffer: Buffer[] = [];

        for await (const value of source) {
          const chunk = Buffer.from(value);

          if (size <= 0) {
            yield chunk;
            continue;
          }

          buffer.push(chunk);
          if (buffer.length === size) {
            yield Buffer.concat(buffer);
            buffer = [];
          }
        }
        if (buffer.length > 0) yield Buffer.concat(buffer);
      }),
    );
  }
}
