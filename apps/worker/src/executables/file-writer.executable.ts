import { writeFile } from 'node:fs/promises';
import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class FileWriter implements Executable {
  async execute(context: ExecutionContext, options: { path: string }) {
    const template = Handlebars.compile(options.path);
    let index = 0;

    for await (const chunk of context.readStream) await writeFile(template({ index: ++index }), chunk);
  }
}
