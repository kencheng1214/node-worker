import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext } from '../app.interface';
import { buffer } from '../utils/stream.util';

@Injectable()
export class Batcher implements Executable {
  execute(context: ExecutionContext, options?: { size?: number }) {
    context.readStream = context.readStream.pipe(buffer(options));
  }
}
