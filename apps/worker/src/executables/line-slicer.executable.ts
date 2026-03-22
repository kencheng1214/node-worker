import { EOL } from 'node:os';
import { Transform } from 'node:stream';
import { Injectable } from '@nestjs/common';
import pumpify from 'pumpify';
import split from 'split2';
import { Executable } from '../app.interface';
import { LineSlicerOptions } from './line-slicer.schema';

@Injectable()
export class LineSlicer implements Executable {
  execute(input: NodeJS.ReadableStream, options?: LineSlicerOptions) {
    const EOL_BUFFER = Buffer.from(EOL);
    const { skipFirst = 0, skipLast = 0 } = options ?? {};
    const writable = split((string) => Buffer.from(string));
    const readable = Transform.from(async function* (lines: AsyncIterable<Buffer>) {
      const window: Buffer[] = [];
      let index = 0;

      for await (const line of lines) {
        if (index++ < skipFirst) continue;

        window.push(line);
        if (window.length > skipLast) yield Buffer.concat([window.shift(), EOL_BUFFER]);
      }
    });

    return input.pipe(pumpify(writable, readable));
  }
}
