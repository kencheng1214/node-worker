import { PassThrough, Readable } from 'node:stream';
import { finished } from 'node:stream/promises';
import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext } from '../../app.interface';
import { PipelineService } from '../../pipeline.service';
import { ReplicatorOptions } from './replicator.schema';

@Injectable()
export class Replicator implements Executable {
  constructor(private readonly pipelineService: PipelineService) {}

  async execute(input: NodeJS.ReadableStream, context: PipelineContext, options?: ReplicatorOptions) {
    const passThrough = new PassThrough({ objectMode: true });
    const replicate = async () => {
      try {
        for await (const chunk of input) {
          context[options.let] = chunk;
          await this.pipelineService.runPipeline(options.pipeline, Readable.from([chunk]), context);
        }
        passThrough.end();
      } catch (error) {
        passThrough.destroy(error);

        throw error;
      }
    };

    await Promise.all([replicate(), finished(input)]);
  }
}
