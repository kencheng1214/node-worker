import { PassThrough } from 'node:stream';
import { finished } from 'node:stream/promises';
import { Injectable } from '@nestjs/common';
import { Executable } from '../app.interface';
import { PipelineExecutorService } from '../pipeline-executor.service';
import { BroadcasterOptions } from './broadcaster.schema';

@Injectable()
export class Broadcaster implements Executable {
  constructor(private readonly pipelineExecutor: PipelineExecutorService) {}

  async execute(input: NodeJS.ReadableStream, options: BroadcasterOptions) {
    const passThroughs = options.branches.map(() => new PassThrough({ objectMode: true }));
    const executions = options.branches.map((branch, index) =>
      this.pipelineExecutor.runPipeline(branch.pipeline, passThroughs[index]),
    );
    const broadcast = async () => {
      try {
        for await (const chunk of input)
          await Promise.all(
            passThroughs.map((passThrough) =>
              passThrough.write(chunk) ? null : new Promise((resolve) => passThrough.once('drain', resolve)),
            ),
          );

        for (const passThrough of passThroughs) passThrough.end();
      } catch (error) {
        for (const passThrough of passThroughs) passThrough.destroy(error);

        throw error;
      }
    };

    await Promise.all([broadcast(), ...executions, finished(input)]);
  }
}
