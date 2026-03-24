import { z } from 'zod';

export const HousekeeperSchema = z.object({
  name: z.literal('Housekeeper'),
  options: z.object({
    path: z.string(),
  }),
});

export type HousekeeperStep = z.infer<typeof HousekeeperSchema>;

export type HousekeeperOptions = HousekeeperStep['options'];
