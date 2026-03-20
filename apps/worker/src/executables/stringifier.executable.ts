import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import through2 from 'through2';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class Stringifier implements Executable {
  execute(context: ExecutionContext, options?: { format?: string }) {
    const template = options?.format ? Handlebars.compile(options.format) : undefined;

    context.readStream = context.readStream.pipe(
      through2.obj((chunk, enc, callback) => callback(null, template?.(chunk) ?? JSON.stringify(chunk))),
    );
  }
}
