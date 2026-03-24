import { z } from 'zod';

export const HousekeeperSchema = z.object({
  name: z.literal('Housekeeper'),
  options: z.object({
    pattern: z.union([z.string(), z.array(z.string())]),
  }),
});

export type HousekeeperOptions = z.infer<typeof HousekeeperSchema>['options'];
