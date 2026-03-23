import { EOL } from 'node:os';
import { Transform } from 'node:stream';
import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import { Executable } from '../../app.interface';
import { StringifierOptions } from './stringifier.schema';

@Injectable()
export class Stringifier implements Executable {
  execute(input: NodeJS.ReadableStream, options?: StringifierOptions) {
    const template = options?.format ? Handlebars.compile(options.format) : undefined;

    return input.pipe(
      Transform.from(async function* (source: AsyncIterable<Buffer>) {
        for await (const value of source) yield (template?.(value) ?? JSON.stringify(value)) + EOL;
      }),
    );
  }
}
