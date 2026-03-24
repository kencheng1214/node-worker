import { z } from 'zod';

export const PathGeneratorSchema = z.object({
  name: z.literal('PathGenerator'),
  options: z.object({
    pattern: z.union([z.string(), z.array(z.string())]),
    let: z.string().optional(),
  }),
});

export type PathGeneratorOptions = z.infer<typeof PathGeneratorSchema>['options'];
