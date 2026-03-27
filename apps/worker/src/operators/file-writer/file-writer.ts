import { writeFile } from 'node:fs/promises';
import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext } from '../../app.interface';
import { compile } from '../../utils/compile';
import { FileWriterOptions } from './file-writer.schema';

@Injectable()
export class FileWriter implements Executable {
  async execute(input: NodeJS.ReadableStream, context: PipelineContext, options: FileWriterOptions) {
    const { PATH_TEMPLATE } = compile(context, options, ['path']);
    let index = 0;

    for await (const chunk of input) await writeFile(PATH_TEMPLATE({ index: ++index }), chunk);
  }
}
