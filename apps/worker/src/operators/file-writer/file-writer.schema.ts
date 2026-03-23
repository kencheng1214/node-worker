import { z } from 'zod';

export const FileWriterSchema = z.object({
  name: z.literal('FileWriter'),
  options: z.object({
    path: z.string(),
  }),
});

export type FileWriterStep = z.infer<typeof FileWriterSchema>;

export type FileWriterOptions = FileWriterStep['options'];
