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

export type BroadcasterOptions = z.infer<typeof BroadcasterSchema>['options'];
