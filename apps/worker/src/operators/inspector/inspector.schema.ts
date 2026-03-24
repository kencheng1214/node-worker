import { z } from 'zod';

export const InspectorSchema = z.object({
  name: z.literal('Inspector'),
  options: z.object().optional(),
});

export type InspectorOptions = z.infer<typeof InspectorSchema>['options'];
