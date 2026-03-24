import { z } from 'zod';

export const FileWriterSchema = z.object({
  name: z.literal('FileWriter'),
  options: z.object({
    path: z.string(),
  }),
});

export type FileWriterOptions = z.infer<typeof FileWriterSchema>['options'];
