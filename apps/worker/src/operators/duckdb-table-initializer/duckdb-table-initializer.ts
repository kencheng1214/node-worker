import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { DuckDBInstance } from '@duckdb/node-api';
import { Executable, PipelineContext } from '../../app.interface';
import { DuckDBTableInitializerOptions } from './duckdb-table-initializer.schema';

@Injectable()
export class DuckDBTableInitializer implements Executable {
  async execute(input: unknown, context: PipelineContext, options: DuckDBTableInitializerOptions) {
    const connectionOptions = context.getConnectionOptions<'duckdb'>(options.connection);
    const instance = await DuckDBInstance.create(connectionOptions.path);
    const connection = await instance.connect();
    const table = options?.table ?? randomUUID();
    const columns = Object.entries(options.schema);
  }
}
