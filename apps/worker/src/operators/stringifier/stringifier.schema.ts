import { z } from 'zod';

export const StringifierSchema = z.object({
  name: z.literal('Stringifier'),
  options: z
    .object({
      format: z.string().optional(),
    })
    .optional(),
});

export type StringifierOptions = z.infer<typeof StringifierSchema>['options'];
