import { Readable } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext } from '../../app.interface';
import { PackerOptions } from './packer.schema';

@Injectable()
export class Packer implements Executable {
  execute(input: NodeJS.ReadableStream, context: PipelineContext, options?: PackerOptions) {
    return Readable.from([input]);
  }
}
