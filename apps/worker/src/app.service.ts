import { PassThrough } from 'node:stream';
import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { Executable, Specification } from './app.interface';
import { BroadcasterOptions } from './executables/broadcaster.schema';

@Injectable()
export class AppService {
  constructor(private readonly moduleRef: ModuleRef) {}

  async run(specification: Specification) {
    let input = undefined;

    await this.runPipeline(input, specification.pipeline);
  }

  private async runPipeline(input: unknown, pipeline: Specification['pipeline']) {
    for (const step of pipeline) {
      if (step.name === 'Broadcaster') await this.fanOut(input, step.options);
      else input = await this.moduleRef.get<Executable>(step.name).execute(input, step.options);
    }
  }

  async fanOut(input: unknown, options: BroadcasterOptions) {
    const forks = options.branches.map(() => new PassThrough({ objectMode: true }));

    forks.forEach((fork) => (input as any).pipe(fork));
    await Promise.all(options.branches.map((branch, index) => this.runPipeline(forks[index], branch.pipeline)));
  }
}
