import { z } from 'zod';
import { OperatorSchema } from '../operators.schema';

export const IteratorSchema = z.object({
  name: z.literal('Iterator'),
  options: z.object({
    let: z.string().optional(),
    pipeline: z.array(z.lazy(() => OperatorSchema)),
  }),
});

export type IteratorOptions = z.infer<typeof IteratorSchema>['options'];
