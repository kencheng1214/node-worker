import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext } from '../../app.interface';
import { DuckDBExecutorOptions } from './duckdb-executor.schema';

@Injectable()
export class DuckDBExecutor implements Executable {
  execute(input: NodeJS.ReadableStream, context: PipelineContext, options: DuckDBExecutorOptions) {}
}
