import { EOL } from 'node:os';
import { Transform } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext } from '../../app.interface';
import { compile } from '../../utils/compile';
import { StringifierOptions } from './stringifier.schema';

@Injectable()
export class Stringifier implements Executable {
  execute(input: NodeJS.ReadableStream, context: PipelineContext, options?: StringifierOptions) {
    const templates = compile(options, 'format');

    return input.pipe(
      Transform.from(async function* (source: AsyncIterable<Buffer>) {
        for await (const value of source)
          yield (options?.format ? context.render(templates.format) : JSON.stringify(value)) + EOL;
      }),
    );
  }
}
