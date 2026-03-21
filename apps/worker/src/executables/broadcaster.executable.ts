import { PassThrough } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { Executable } from '../app.interface';
import { PipelineExecutorService } from '../pipeline-executor.service';
import { BroadcasterOptions } from './broadcaster.schema';

const waitDrain = (stream: NodeJS.WritableStream) => new Promise<void>((resolve) => stream.once('drain', resolve));

@Injectable()
export class Broadcaster implements Executable {
  constructor(private readonly pipelineExecutor: PipelineExecutorService) {}

  async execute(input: NodeJS.ReadableStream, options: BroadcasterOptions) {
    const passThroughs = options.branches.map(() => new PassThrough({ objectMode: true }));
    const runs = options.branches.map((branch, index) =>
      this.pipelineExecutor.runPipeline(branch.pipeline, passThroughs[index]),
    );
    const pump = (async () => {
      try {
        for await (const chunk of input) {
          await Promise.all(
            passThroughs.map(async (fork) => {
              if (fork.write(chunk)) return;
              await waitDrain(fork);
            }),
          );
        }

        passThroughs.forEach((fork) => fork.end());
      } catch (error) {
        passThroughs.forEach((fork) => fork.destroy(error as Error));
        throw error;
      }
    })();

    await Promise.all([pump, ...runs]);
  }
}
