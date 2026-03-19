import { createReadStream } from 'node:fs';
import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class FileReader implements Executable {
  execute(context: ExecutionContext, options: { path: string }) {
    context.readStream = createReadStream(options.path);
  }
}
