import { Readable } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { Executable } from '../app.interface';

@Injectable()
export class Packer implements Executable {
  execute(input: any, options?: Record<string, any>) {
    return Readable.from([input]);
  }
}
