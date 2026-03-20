import { finished } from 'node:stream/promises';
import { Injectable } from '@nestjs/common';
import { Executable } from '../app.interface';
import { StdoutWriterOptions } from './stdout-writer.schema';

@Injectable()
export class StdoutWriter implements Executable {
  async execute(input: NodeJS.ReadableStream, options?: StdoutWriterOptions) {
    input.pipe(process.stdout, { end: false });
    await finished(input);
  }
}
