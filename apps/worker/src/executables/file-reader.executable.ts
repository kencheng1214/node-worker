import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import split2 from 'split2';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class FileReader implements Executable {
  execute(context: ExecutionContext, options?: Record<string, any>) {
    if (!context.path) throw new Error();

    context.readStream = createReadStream(context.path).pipe(split2());
  }
}
