import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class Collector implements Executable {
  execute(context: ExecutionContext, options?: Record<string, any>) {}
}
