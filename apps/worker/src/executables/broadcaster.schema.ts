import { z } from 'zod';
import { SINK, SOURCE, TRANSFORM } from '../app.interface';

export const BroadcasterSchema = z.object({
  name: z.literal('Broadcaster'),
  options: z.object({
    branches: z.array(
      z.object({
        pipeline: z.array(z.discriminatedUnion('name', [...SOURCE, ...TRANSFORM, ...SINK])),
      }),
    ),
  }),
});

export type BroadcasterStep = z.infer<typeof BroadcasterSchema>;

export type BroadcasterOptions = BroadcasterStep['options'];
