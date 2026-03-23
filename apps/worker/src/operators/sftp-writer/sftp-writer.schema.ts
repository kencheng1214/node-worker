import { z } from 'zod';

export const SftpWriterSchema = z.object({
  name: z.literal('SftpWriter'),
  options: z.object({
    credential: z.string(),
  }),
});

export type SftpWriterStep = z.infer<typeof SftpWriterSchema>;

export type SftpWriterOptions = SftpWriterStep['options'];
