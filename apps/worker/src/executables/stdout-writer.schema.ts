import { z } from 'zod';

export const StdoutWriterSchema = z.object({
  name: z.literal('StdoutWriter'),
  options: z.object().optional(),
});

export type StdoutWriterStep = z.infer<typeof StdoutWriterSchema>;

export type StdoutWriterOptions = StdoutWriterStep['options'];
