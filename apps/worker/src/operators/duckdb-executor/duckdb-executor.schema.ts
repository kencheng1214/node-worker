import { z } from 'zod';

export const DuckDBExecutorSchema = z.object({
  name: z.literal('DuckDBExecutor'),
  options: z.object({
    sql: z.string(),
  }),
});

export type DuckDBExecutorOptions = z.infer<typeof DuckDBExecutorSchema>['options'];
