import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext, Specification } from '../app.interface';
import { TEMPLATABLE_OPTIONS_METADATA } from '../decorators/templatable-options.decorator';
import { compile2 } from '../utils/compile';

@Injectable()
export class PipelineService {
  constructor(private readonly moduleRef: ModuleRef) {}

  async runPipeline(pipeline: Specification['pipeline'], input = undefined, context: PipelineContext) {
    for (const operator of pipeline) {
      const executable = this.moduleRef.get<Executable>(operator.name);
      const paths = Reflect.getMetadata(TEMPLATABLE_OPTIONS_METADATA, executable.constructor);

      if (paths) compile2(context, operator.options, ...paths);
      input = await executable.execute(input, context, operator.options);
      context.templates = {};
    }
  }
}
