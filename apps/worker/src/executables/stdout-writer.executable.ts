import { Injectable } from '@nestjs/common';
import { Executable } from '../app.interface';
import { StdoutWriterOptions } from './stdout-writer.schema';

@Injectable()
export class StdoutWriter implements Executable {
  async execute(input: NodeJS.ReadableStream, options?: StdoutWriterOptions) {
    for await (const chunk of input) {
      const canContinue = process.stdout.write(chunk);
      if (canContinue) continue;
      await new Promise<void>((resolve) => process.stdout.once('drain', resolve));
    }
  }
}
