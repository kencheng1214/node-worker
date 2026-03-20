import { EOL } from 'node:os';
import { Transform } from 'node:stream';
import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class Stringifier implements Executable {
  execute(context: ExecutionContext, options?: { format?: string }) {
    const template = options?.format ? Handlebars.compile(options.format) : undefined;

    context.readStream = context.readStream.pipe(
      Transform.from(async function* (source: AsyncIterable<Buffer>) {
        for await (const value of source) yield (template?.(value) ?? JSON.stringify(value)) + EOL;
      }),
    );
  }
}
