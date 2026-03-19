import { createWriteStream } from 'node:fs';
import { Executable, ExecutionContext } from '../app.interface';

export class FileWriter implements Executable {
  execute(context: ExecutionContext, options: { path: string }) {
    if (!context.readStream) throw new Error();

    context.readStream.pipe(createWriteStream(options.path));
  }
}
