import { Readable } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { DuckDBInstance } from '@duckdb/node-api';
import { Executable, PipelineContext } from '../../app.interface';
import { compile } from '../../utils/compile';
import { getConnectionOptions } from '../../utils/get-connection-options';
import { DuckDBExecutorOptions } from './duckdb-executor.schema';

@Injectable()
export class DuckDBExecutor implements Executable {
  async execute(input: unknown, context: PipelineContext, options: DuckDBExecutorOptions) {
    const templates = compile(options, 'sql');
    const connectionOptions = getConnectionOptions<'duckdb'>(context, options.connection);
    const instance = await DuckDBInstance.create(connectionOptions.path);
    const connection = await instance.connect();
    const result = await connection.stream(context.render(templates.sql));

    return Readable.from(result.yieldRows());
  }
}
