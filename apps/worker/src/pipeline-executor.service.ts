import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { Executable, Specification } from './app.interface';

@Injectable()
export class PipelineExecutorService {
  constructor(private readonly moduleRef: ModuleRef) {}

  async runPipeline(pipeline: Specification['pipeline'], input = undefined) {
    for (const step of pipeline) input = await this.moduleRef.get<Executable>(step.name).execute(input, step.options);
  }
}
