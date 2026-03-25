import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext } from '../../app.interface';
import { SqlExecutorOptions } from './sql-executor.schema';

@Injectable()
export class SqlExecutor implements Executable {
  execute(input: NodeJS.ReadableStream, context: PipelineContext, options: SqlExecutorOptions) {}
}
