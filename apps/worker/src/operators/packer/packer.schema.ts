import { z } from 'zod';

export const PackerSchema = z.object({
  name: z.literal('Packer'),
  options: z.object().optional(),
});

export type PackerOptions = z.infer<typeof PackerSchema>['options'];
