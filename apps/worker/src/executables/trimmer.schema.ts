import { z } from 'zod';

export const TrimmerSchema = z.object({
  name: z.literal('Trimmer'),
  options: z
    .object({
      start: z.number().optional(),
      end: z.number().optional(),
    })
    .optional(),
});

export type TrimmerStep = z.infer<typeof TrimmerSchema>;

export type TrimmerOptions = TrimmerStep['options'];
