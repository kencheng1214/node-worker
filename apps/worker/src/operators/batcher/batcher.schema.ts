import { z } from 'zod';

export const BatcherSchema = z.object({
  name: z.literal('Batcher'),
  options: z
    .object({
      size: z.number().optional(),
    })
    .optional(),
});

export type BatcherOptions = z.infer<typeof BatcherSchema>['options'];
