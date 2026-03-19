import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class OracleLoader implements Executable {
  async execute(context: ExecutionContext, options?: Record<string, any>) {
    for await (const row of context.readStream) console.log(row);
  }
}
