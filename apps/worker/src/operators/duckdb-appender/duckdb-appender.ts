import { Injectable } from '@nestjs/common';
import { DuckDBInstance } from '@duckdb/node-api';
import { Executable, PipelineContext } from '../../app.interface';
import { DuckDBAppenderOptions } from './duckdb-appender.schema';

@Injectable()
export class DuckDBAppender implements Executable {
  async execute(input: NodeJS.ReadableStream, context: PipelineContext, options: DuckDBAppenderOptions) {
    const connectionOptions = context.getConnectionOptions<'duckdb'>(options.connection);
    const instance = await DuckDBInstance.create(connectionOptions.path);
    const connection = await instance.connect();
    const appender = await connection.createAppender(options.table);
  }
}
