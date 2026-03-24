import { z } from 'zod';

export const ArchiverSchema = z.object({
  name: z.literal('Archiver'),
  options: z.object({
    path: z.string(),
    format: z.enum(['zip', 'tar']).optional(),
    filename: z.string().optional(),
  }),
});

export type ArchiverOptions = z.infer<typeof ArchiverSchema>['options'];
