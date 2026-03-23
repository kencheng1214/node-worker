import { createReadStream } from 'node:fs';
import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext } from '../../app.interface';
import { FileReaderOptions } from './file-reader.schema';

@Injectable()
export class FileReader implements Executable {
  execute(input: unknown, context: PipelineContext, options?: FileReaderOptions) {
    return createReadStream(options.path);
  }
}
