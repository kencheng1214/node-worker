import { PipelineContext } from '../app.interface';
import { Connection } from '../connections/connections.schema';

export function getConnectionOptions<T extends Connection['type']>(
  context: PipelineContext,
  name: string,
): Extract<Connection, { type: T }>['options'] {
  return context.connections?.[name]?.options ?? {};
}
