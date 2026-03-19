import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext, Specification } from './app.interface';

@Injectable()
export class AppService {
  async run(specification: Specification) {
    const context: ExecutionContext = {};

    console.log(JSON.stringify(specification, null, 2));
    for (const _ of specification.pipeline) {
      const execute = {} as Executable;

      // await execute.execute(context);
    }
  }
}
