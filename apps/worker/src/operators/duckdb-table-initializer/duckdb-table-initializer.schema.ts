import { z } from 'zod';

export const DuckDBTableInitializerSchema = z.object({
  name: z.literal('DuckDBTableInitializer'),
  options: z.object({
    connection: z.string(),
    table: z.string().optional(),
    schema: z.record(z.string(), z.string()),
  }),
});

export type DuckDBTableInitializerOptions = z.infer<typeof DuckDBTableInitializerSchema>['options'];
