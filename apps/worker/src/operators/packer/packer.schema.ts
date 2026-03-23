import { z } from 'zod';

export const PackerSchema = z.object({
  name: z.literal('Packer'),
  options: z.object().optional(),
});

export type PackerStep = z.infer<typeof PackerSchema>;

export type PackerOptions = PackerStep['options'];
