import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext } from '../../app.interface';
import { DuckDBAppenderOptions } from './duckdb-appender.schema';

@Injectable()
export class DuckDBAppender implements Executable {
  execute(input: NodeJS.ReadableStream, context: PipelineContext, options: DuckDBAppenderOptions) {}
}
