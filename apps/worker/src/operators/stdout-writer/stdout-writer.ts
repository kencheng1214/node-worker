import { finished } from 'node:stream/promises';
import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext } from '../../app.interface';
import { StdoutWriterOptions } from './stdout-writer.schema';

@Injectable()
export class StdoutWriter implements Executable {
  async execute(input: NodeJS.ReadableStream, context: PipelineContext, options?: StdoutWriterOptions) {
    input.pipe(process.stdout, { end: false });
    await finished(input);
  }
}
