import { Injectable, Type } from '@nestjs/common';
import { Executable, ExecutionContext, Specification } from './app.interface';
import { FilePoller } from './file-poller';

@Injectable()
export class AppService {
  private readonly PIPELINE_STEP_MAP = new Map<string, Type<Executable>>();

  constructor() {
    this.PIPELINE_STEP_MAP.set('FilePoller', FilePoller);
  }

  async run(specification: Specification) {
    const context: ExecutionContext = {};

    console.log(JSON.stringify(specification, null, 2));
    for (const step of specification.pipeline) {
      const executable = new (this.PIPELINE_STEP_MAP.get(step.name))(step.options);

      await executable.execute(context);
    }
  }
}
