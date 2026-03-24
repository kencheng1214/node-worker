import { z } from 'zod';

export const FileReaderSchema = z.object({
  name: z.literal('FileReader'),
  options: z.object({
    path: z.string(),
  }),
});

export type FileReaderOptions = z.infer<typeof FileReaderSchema>['options'];
