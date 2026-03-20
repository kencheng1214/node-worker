import { EOL } from 'node:os';
import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import through2 from 'through2';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class Stringifier implements Executable {
  execute(context: ExecutionContext, options?: { format?: string; eol?: boolean }) {
    const template = options?.format ? Handlebars.compile(options.format) : undefined;
    const eol = options?.eol === false ? '' : EOL;

    context.readStream = context.readStream.pipe(
      through2.obj((chunk, enc, callback) => callback(null, (template?.(chunk) ?? JSON.stringify(chunk)) + eol)),
    );
  }
}
