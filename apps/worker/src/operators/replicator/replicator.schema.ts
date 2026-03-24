import { z } from 'zod';
import { OperatorSchema } from '../operators.schema';

export const ReplicatorSchema = z.object({
  name: z.literal('Replicator'),
  options: z.object({
    pipeline: z.array(z.lazy(() => OperatorSchema)),
  }),
});

export type ReplicatorOptions = z.infer<typeof ReplicatorSchema>['options'];
