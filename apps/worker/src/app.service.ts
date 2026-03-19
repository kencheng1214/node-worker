import { readFile } from 'node:fs/promises';
import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext, SpecificationSchema } from './app.interface';

@Injectable()
export class AppService {
  async run(file: string) {
    const specification = SpecificationSchema.parse(await readFile(file));
    const context: ExecutionContext = {};

    console.log(JSON.stringify(specification, null, 2));
    for (const executable of specification.pipeline) {
      const service = {} as Executable;

      service.execute(context);
    }
  }
}
