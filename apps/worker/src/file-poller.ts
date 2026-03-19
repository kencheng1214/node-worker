import { Executable, ExecutionContext } from './app.interface';

export class FilePoller implements Executable {
  constructor(private readonly options?: {}) {}

  execute(context: ExecutionContext) {}
}
