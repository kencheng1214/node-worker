import { z } from 'zod';

export const StdoutWriterSchema = z.object({
  name: z.literal('StdoutWriter'),
  options: z.object().optional(),
});

export type StdoutWriterOptions = z.infer<typeof StdoutWriterSchema>['options'];
