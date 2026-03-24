import { z } from 'zod';
import { OperatorSchema } from '../../operators.schema';

export const BroadcasterSchema = z.object({
  name: z.literal('Broadcaster'),
  options: z.object({
    branches: z.array(
      z.object({
        pipeline: z.array(z.lazy(() => OperatorSchema)),
      }),
    ),
  }),
});

export type BroadcasterStep = z.infer<typeof BroadcasterSchema>;

export type BroadcasterOptions = BroadcasterStep['options'];
