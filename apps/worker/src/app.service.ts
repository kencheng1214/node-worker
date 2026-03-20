import { ModuleRef } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { Executable, Specification } from './app.interface';

@Injectable()
export class AppService {
  constructor(private readonly moduleRef: ModuleRef) {}

  async run(specification: Specification) {
    let input: unknown = undefined;

    for (const step of specification.pipeline)
      input = await this.moduleRef.get<Executable>(step.name).execute(input, step.options);
  }
}
