import { z } from 'zod';

export const StringifierSchema = z.object({
  name: z.literal('Stringifier'),
  options: z
    .object({
      format: z.string().optional(),
    })
    .optional(),
});

export type StringifierStep = z.infer<typeof StringifierSchema>;

export type StringifierOptions = StringifierStep['options'];
