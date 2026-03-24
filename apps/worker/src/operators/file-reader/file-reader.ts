import { createReadStream } from 'node:fs';
import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import { Executable, PipelineContext } from '../../app.interface';
import { FileReaderOptions } from './file-reader.schema';

@Injectable()
export class FileReader implements Executable {
  execute(input: unknown, context: PipelineContext, options?: FileReaderOptions) {
    const template = Handlebars.compile(options.path);

    return createReadStream(template(context));
  }
}
