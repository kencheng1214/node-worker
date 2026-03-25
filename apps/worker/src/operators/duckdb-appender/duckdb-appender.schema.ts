import { z } from 'zod';

export const DuckDBAppenderSchema = z.object({
  name: z.literal('DuckDBAppender'),
  options: z.object({
    connection: z.string(),
    table: z.string(),
  }),
});

export type DuckDBAppenderOptions = z.infer<typeof DuckDBAppenderSchema>['options'];
