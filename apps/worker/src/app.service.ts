import { writeFile } from 'node:fs/promises';
import { ModuleRef } from '@nestjs/core';
import { Injectable, Logger } from '@nestjs/common';
import { Executable, ExecutionContext, Specification } from './app.interface';
import { buffer } from './utils/stream.util';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  async run(specification: Specification) {
    const context: ExecutionContext = {};

    console.log(JSON.stringify(specification, null, 2));
    for (const step of specification.pipeline) {
      const executable = this.moduleRef.get<Executable>(step.name);

      await executable.execute(context, step.options);
    }

    let index = 0;
    for await (const chunk of context.readStream.pipe(buffer())) {
      await writeFile(`timezone.txt.${++index}`, chunk);
    }
  }
}
