import { createWriteStream } from 'node:fs';
import { Injectable } from '@nestjs/common';
import archiver from 'archiver';
import Handlebars from 'handlebars';
import { Executable, PipelineContext } from '../../app.interface';
import { ArchiverOptions } from './archiver.schema';

@Injectable()
export class Archiver implements Executable {
  async execute(input: NodeJS.ReadableStream, context: PipelineContext, options?: ArchiverOptions) {
    const template = options.filename ? Handlebars.compile(options.filename) : undefined;
    const writeStream = createWriteStream(options.path);
    const archive = archiver(options.format ?? 'zip');
    let index = 0;

    archive.pipe(writeStream);
    for await (const chunk of input) archive.append(chunk, { name: template?.({ index: ++index }) ?? String(++index) });
    await archive.finalize();

    await new Promise<void>((resolve, reject) => writeStream.on('close', resolve).on('error', reject));
  }
}
