import { ModuleRef } from '@nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Executable, ExecutionContext, Specification } from './app.interface';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  async run(specification: Specification) {
    const context: ExecutionContext = {};

    for (const step of specification.pipeline) {
      const executable = this.moduleRef.get<Executable>(step.name);

      await executable.execute(context, step.options);
    }
  }
}
