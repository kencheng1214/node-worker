import { z } from 'zod';

export const BatcherSchema = z.object({
  name: z.literal('Batcher'),
  options: z
    .object({
      size: z.number().optional(),
    })
    .optional(),
});

export type BatcherStep = z.infer<typeof BatcherSchema>;

export type BatcherOptions = BatcherStep['options'];
