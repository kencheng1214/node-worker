import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext, Specification } from './app.interface';

@Injectable()
export class PipelineExecutorService {
  constructor(private readonly moduleRef: ModuleRef) {}

  async runPipeline(pipeline: Specification['pipeline'], input = undefined, context?: PipelineContext) {
    for (const step of pipeline)
      input = await this.moduleRef.get<Executable>(step.name).execute(input, step.options, context);
  }
}
