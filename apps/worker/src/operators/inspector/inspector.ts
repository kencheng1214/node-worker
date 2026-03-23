import { Injectable } from '@nestjs/common';
import { PassThrough } from 'stream';
import { Executable } from '../../app.interface';
import { InspectorOptions } from './inspector.schema';

@Injectable()
export class Inspector implements Executable {
  execute(input: NodeJS.ReadableStream, options?: InspectorOptions) {
    return input.pipe(
      PassThrough.from(async function* (source: AsyncIterable<Buffer>) {
        for await (const value of source) {
          console.log(value);
          yield value;
        }
      }),
    );
  }
}
