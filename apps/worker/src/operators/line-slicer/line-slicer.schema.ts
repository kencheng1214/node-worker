import { z } from 'zod';

export const LineSlicerSchema = z.object({
  name: z.literal('LineSlicer'),
  options: z
    .object({
      skipFirst: z.number().optional(),
      skipLast: z.number().optional(),
    })
    .optional(),
});

export type LineSlicerOptions = z.infer<typeof LineSlicerSchema>['options'];
