import { randomUUID } from 'node:crypto';
import { Injectable, Logger } from '@nestjs/common';
import { DuckDBInstance } from '@duckdb/node-api';
import { Executable, PipelineContext } from '../../app.interface';
import { getConnectionOptions } from '../../utils/get-connection-options';
import { DuckDBTableInitializerOptions } from './duckdb-table-initializer.schema';

@Injectable()
export class DuckDBTableInitializer implements Executable {
  private readonly logger = new Logger(DuckDBTableInitializer.name);

  async execute(input: unknown, context: PipelineContext, options: DuckDBTableInitializerOptions) {
    const connectionOptions = getConnectionOptions<'duckdb'>(context, options.connection);
    const instance = await DuckDBInstance.create(connectionOptions.path);
    const connection = await instance.connect();
    const sql = this.buildCreateTableStatement(options);

    this.logger.debug(sql);
    await connection.run(sql);
  }

  private buildCreateTableStatement(options: DuckDBTableInitializerOptions) {
    const segments: string[] = [];
    const columns = Object.entries(options.schema).map(([name, type]) => `"${name}" ${type}`);

    segments.push('CREATE');
    if (options?.truncate) segments.push('OR REPLACE');
    if (options?.temporary) segments.push('TEMP');
    segments.push('TABLE');
    if (!options?.truncate) segments.push('IF NOT EXISTS');
    segments.push(`"${options?.table ?? randomUUID()}"`);
    segments.push('(');
    segments.push(columns.join(', '));
    segments.push(')');

    return segments.join(' ');
  }
}
