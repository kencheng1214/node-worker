import { unlink } from 'node:fs/promises';
import { Injectable } from '@nestjs/common';
import { glob } from 'glob';
import { Executable, PipelineContext } from '../../app.interface';
import { HousekeeperOptions } from './housekeeper.schema';

@Injectable()
export class Housekeeper implements Executable {
  async execute(input: NodeJS.ReadableStream, context: PipelineContext, options?: HousekeeperOptions) {
    for await (const path of glob.iterate(options.pattern)) await unlink(path);
  }
}
