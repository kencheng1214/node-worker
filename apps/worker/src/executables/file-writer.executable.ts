import { writeFile } from 'node:fs/promises';
import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import { Executable } from '../app.interface';
import { FileWriterOptions } from './file-writer.schema';

@Injectable()
export class FileWriter implements Executable {
  async execute(input: NodeJS.ReadableStream, options?: FileWriterOptions) {
    const template = Handlebars.compile(options.path);
    let index = 0;

    for await (const chunk of input) await writeFile(template({ index: ++index }), chunk);

    return input;
  }
}
