import { Readable } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class Packer implements Executable {
  execute(context: ExecutionContext, options?: Record<string, any>) {
    context.readStream = Readable.from([context.readStream]);
  }
}
