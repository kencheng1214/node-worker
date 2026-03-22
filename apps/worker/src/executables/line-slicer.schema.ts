import { z } from 'zod';

export const LineSlicerSchema = z.object({
  name: z.literal('LineSlicer'),
  options: z
    .object({
      first: z.number().optional(),
      last: z.number().optional(),
    })
    .optional(),
});

export type LineSlicerStep = z.infer<typeof LineSlicerSchema>;

export type LineSlicerOptions = LineSlicerStep['options'];
