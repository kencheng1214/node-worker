import { createWriteStream } from 'node:fs';
import { Injectable } from '@nestjs/common';
import archiver from 'archiver';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class Archiver implements Executable {
  async execute(context: ExecutionContext, options: { path: string }) {
    const writeStream = createWriteStream(options.path);
    const archive = archiver('zip');
    let index = 0;

    archive.pipe(writeStream);
    for await (const chunk of context.readStream) {
    }
  }
}
