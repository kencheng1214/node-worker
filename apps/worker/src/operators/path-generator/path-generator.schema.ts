import { z } from 'zod';

export const PathGeneratorSchema = z.object({
  name: z.literal('PathGenerator'),
  options: z.object({
    pattern: z.union([z.string(), z.array(z.string())]),
  }),
});

export type PathGeneratorStep = z.infer<typeof PathGeneratorSchema>;

export type PathGeneratorOptions = PathGeneratorStep['options'];
