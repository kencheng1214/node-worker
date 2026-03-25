import { z } from 'zod';

export const DuckDBAppenderSchema = z.object({
  name: z.literal('DuckDBAppender'),
  options: z.object(),
});

export type DuckDBAppenderOptions = z.infer<typeof DuckDBAppenderSchema>['options'];
