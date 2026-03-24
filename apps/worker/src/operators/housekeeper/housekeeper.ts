import { unlink } from 'node:fs/promises';
import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext } from '../../app.interface';
import { HousekeeperOptions } from './housekeeper.schema';

@Injectable()
export class Housekeeper implements Executable {
  async execute(input: NodeJS.ReadableStream, context: PipelineContext, options?: HousekeeperOptions) {
    await unlink(options.path);
  }
}
