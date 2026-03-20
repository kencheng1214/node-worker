import { Injectable } from '@nestjs/common';
import { Executable } from '../app.interface';
import { BroadcasterOptions } from './broadcaster.schema';

@Injectable()
export class Broadcaster implements Executable {
  execute(input: NodeJS.ReadableStream, options: BroadcasterOptions) {
    throw new Error('Broadcaster is not implemented yet');
  }
}
