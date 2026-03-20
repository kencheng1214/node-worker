import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import through2 from 'through2';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class Stringifier implements Executable {
  execute(context: ExecutionContext, options?: { format?: string }) {
    const template = Handlebars.compile(options?.format ?? '');

    context.readStream = context.readStream.pipe(
      through2.obj((chunk, enc, callback) => callback(null, options?.format ? template(chunk) : JSON.stringify(chunk))),
    );
  }
}
