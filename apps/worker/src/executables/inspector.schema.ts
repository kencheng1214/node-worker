import { z } from 'zod';

export const InspectorSchema = z.object({
  name: z.literal('Inspector'),
  options: z.object().optional(),
});

export type InspectorStep = z.infer<typeof InspectorSchema>;

export type InspectorOptions = InspectorStep['options'];
