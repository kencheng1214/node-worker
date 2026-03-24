import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext, Specification } from './app.interface';

@Injectable()
export class PipelineService {
  constructor(private readonly moduleRef: ModuleRef) {}

  async runPipeline(pipeline: Specification['pipeline'], input = undefined, context: PipelineContext) {
    for (const operator of pipeline)
      input = await this.moduleRef.get<Executable>(operator.name).execute(input, context, operator.options);
  }
}
