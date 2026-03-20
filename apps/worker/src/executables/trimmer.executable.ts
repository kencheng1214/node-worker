import { EOL } from 'node:os';
import { Transform } from 'node:stream';
import { Injectable } from '@nestjs/common';
import pumpify from 'pumpify';
import split from 'split2';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class Trimmer implements Executable {
  execute(context: ExecutionContext, options?: { start?: number; end?: number }) {
    const EOL_BUFFER = Buffer.from(EOL);
    const { start = 0, end = 0 } = options ?? {};
    const writable = split((string) => Buffer.from(string));
    const readable = Transform.from(async function* (lines: AsyncIterable<Buffer>) {
      const window: Buffer[] = [];
      let index = 0;

      for await (const line of lines) {
        if (index++ < start) continue;

        window.push(line);
        if (window.length > end) yield Buffer.concat([window.shift(), EOL_BUFFER]);
      }
    });

    context.readStream = context.readStream.pipe(pumpify(writable, readable));
  }
}
