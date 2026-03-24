import { PassThrough } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { globStream } from 'glob';
import { Executable, PipelineContext } from '../../app.interface';
import { PathGeneratorOptions } from './path-generator.schema';

@Injectable()
export class PathGenerator implements Executable {
  execute(input: unknown, context: PipelineContext, options: PathGeneratorOptions) {
    return globStream(options.pattern).pipe(
      PassThrough.from(async function* (source: AsyncIterable<string>) {
        for await (const value of source) {
          context[options.let] = value;
          yield value;
        }
      }),
    );
  }
}
