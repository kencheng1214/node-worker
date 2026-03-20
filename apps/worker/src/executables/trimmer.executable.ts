import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext } from '../app.interface';
import { trim } from '../utils/stream.util';

@Injectable()
export class Trimmer implements Executable {
  execute(context: ExecutionContext, options?: { start?: number; end?: number }) {
    context.readStream = context.readStream.pipe(trim(options));
  }
}
