import { Injectable } from '@nestjs/common';
import { PassThrough } from 'stream';
import { Executable, PipelineContext } from '../../app.interface';
import { InspectorOptions } from './inspector.schema';

@Injectable()
export class Inspector implements Executable {
  execute(input: NodeJS.ReadableStream, context: PipelineContext, options?: InspectorOptions) {
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
