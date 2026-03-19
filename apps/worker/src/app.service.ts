import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext, Specification } from './app.interface';

@Injectable()
export class AppService {
  constructor(private readonly moduleRef: ModuleRef) {}

  async run(specification: Specification) {
    const context: ExecutionContext = {};

    console.log(JSON.stringify(specification, null, 2));
    for (const step of specification.pipeline) {
      const executable = this.moduleRef.get<Executable>(step.name);

      await executable.execute(context, step.options);
    }
  }
}
