import { writeFile } from 'node:fs/promises';
import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import { Executable, PipelineContext } from '../../app.interface';
import { FileWriterOptions } from './file-writer.schema';

@Injectable()
export class FileWriter implements Executable {
  async execute(input: NodeJS.ReadableStream, context: PipelineContext, options: FileWriterOptions) {
    const pathTemplate = Handlebars.compile(options.path);
    let index = 0;

    for await (const chunk of input) await writeFile(context.render(pathTemplate, { index: ++index }), chunk);
  }
}
