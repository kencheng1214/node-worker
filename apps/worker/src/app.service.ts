import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { PassThrough } from 'stream';
import { Executable, Specification } from './app.interface';
import { Broadcaster } from './executables/broadcaster.executable';
import { BroadcasterOptions, BroadcasterStep } from './executables/broadcaster.schema';

@Injectable()
export class AppService {
  constructor(private readonly moduleRef: ModuleRef) {}

  async run(specification: Specification) {
    let input = undefined;

    await this.runPipeline(input, specification.pipeline);
  }

  private async runPipeline(input: unknown, pipeline: Specification['pipeline']) {
    for (const step of pipeline) {
      const executable = this.moduleRef.get<Executable>(step.name);

      if (step.name === Broadcaster.name) {
        await this.fanOut(input, (step as BroadcasterStep).options);
      } else input = await executable.execute(input, step.options);
    }
  }

  async fanOut(input: unknown, options: BroadcasterOptions) {
    const forks = options.pipeline.map(() => new PassThrough({ objectMode: true }));

    forks.forEach((fork) => (input as any).pipe(fork));

    const tasks = options.pipeline.map((step, index) => {
      const executable = this.moduleRef.get<Executable>(step.name);
      return executable.execute(forks[index], step.options);
    });

    await Promise.all(tasks);
  }
}
