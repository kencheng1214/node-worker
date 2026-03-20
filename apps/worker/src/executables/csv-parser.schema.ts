import { z } from 'zod';

export const CsvParserSchema = z.object({
  name: z.literal('CsvParser'),
  options: z
    .object({
      columns: z.union([z.boolean(), z.array(z.string())]).optional(),
    })
    .optional(),
});

export type CsvParserStep = z.infer<typeof CsvParserSchema>;

export type CsvParserOptions = CsvParserStep['options'];
