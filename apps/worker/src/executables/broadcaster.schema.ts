import { z } from 'zod';

export const BroadcasterSchema = z.object({
  name: z.literal('Broadcaster'),
  options: z.object().optional(),
});

export type BroadcasterStep = z.infer<typeof BroadcasterSchema>;

export type BroadcasterOptions = BroadcasterStep['options'];
