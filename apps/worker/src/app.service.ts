import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { Executable, Specification } from './app.interface';

@Injectable()
export class AppService {
  constructor(private readonly moduleRef: ModuleRef) {}

  async run(specification: Specification) {
    await this.runPipeline(specification.pipeline);
  }

  private async runPipeline(pipeline: Specification['pipeline']) {
    let input = undefined;

    for (const step of pipeline) {
      const executable = this.moduleRef.get<Executable>(step.name);

      input = await executable.execute(input, step.options);
    }
  }
}
