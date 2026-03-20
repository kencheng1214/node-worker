import { createWriteStream } from 'node:fs';
import { Injectable } from '@nestjs/common';
import archiver from 'archiver';
import Handlebars from 'handlebars';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class Archiver implements Executable {
  async execute(context: ExecutionContext, options: { path: string; format?: archiver.Format; filename?: string }) {
    const template = options.filename ? Handlebars.compile(options.filename) : undefined;
    const writeStream = createWriteStream(options.path);
    const archive = archiver(options.format ?? 'zip');
    let index = 0;

    archive.pipe(writeStream);
    for await (const chunk of context.readStream)
      archive.append(chunk, { name: template?.({ index: ++index }) ?? String(++index) });
    await archive.finalize();

    return new Promise<void>((resolve, reject) => writeStream.on('close', resolve).on('error', reject));
  }
}
