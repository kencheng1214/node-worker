import { createReadStream } from 'node:fs';
import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext } from '../app.interface';
import { trim } from '../utils/stream.util';

@Injectable()
export class FileReader implements Executable {
  execute(context: ExecutionContext, options?: { path: string; trim?: { start?: number; end?: number } }) {
    context.readStream = createReadStream(options.path).pipe(trim(options.trim));
  }
}
