import { Readable } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { Executable } from '../../app.interface';
import { PackerOptions } from './packer.schema';

@Injectable()
export class Packer implements Executable {
  execute(input: NodeJS.ReadableStream, options?: PackerOptions) {
    return Readable.from([input]);
  }
}
