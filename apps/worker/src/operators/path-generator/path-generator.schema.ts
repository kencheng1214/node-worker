import { z } from 'zod';

export const PathGeneratorSchema = z.object({
  name: z.literal('PathGenerator'),
  options: z.object({}),
});

export type PathGeneratorStep = z.infer<typeof PathGeneratorSchema>;

export type PathGeneratorOptions = PathGeneratorStep['options'];
