import { createWriteStream } from 'node:fs';
import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class FileWriter implements Executable {
  async execute(context: ExecutionContext, options: { path: string }) {
    context.readStream.pipe(createWriteStream(options.path));
  }
}
