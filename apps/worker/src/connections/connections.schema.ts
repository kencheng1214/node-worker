import { z } from 'zod';

export const DuckDBConnectionSchema = z.object({
  type: z.literal('duckdb'),
  options: z
    .object({
      path: z.string().optional(),
    })
    .optional(),
});

export const ConnectionSchema = z.discriminatedUnion('type', [DuckDBConnectionSchema]);

export type Connection = z.infer<typeof ConnectionSchema>;
