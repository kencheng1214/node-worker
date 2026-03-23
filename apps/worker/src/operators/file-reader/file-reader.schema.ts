import { z } from 'zod';

export const FileReaderSchema = z.object({
  name: z.literal('FileReader'),
  options: z.object({
    path: z.string(),
  }),
});

export type FileReaderStep = z.infer<typeof FileReaderSchema>;

export type FileReaderOptions = FileReaderStep['options'];
