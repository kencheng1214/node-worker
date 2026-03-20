import { writeFile } from 'node:fs/promises';
import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import { Executable, ExecutionContext } from '../app.interface';
import { buffer } from '../utils/stream.util';

@Injectable()
export class FileWriter implements Executable {
  async execute(context: ExecutionContext, options: { path: string; buffer?: { size?: number } }) {
    const template = Handlebars.compile(options.path);
    let index = 0;

    for await (const chunk of context.readStream.pipe(buffer(options.buffer)))
      await writeFile(template({ index: ++index }), chunk);
  }
}
