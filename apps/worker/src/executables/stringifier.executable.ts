import through2 from 'through2';
import { Executable, ExecutionContext } from '../app.interface';

export class Stringifier implements Executable {
  execute(context: ExecutionContext, options?: Record<string, any>) {
    context.readStream = context.readStream.pipe(through2.obj((chunk, enc, callback) => callback()));
  }
}
