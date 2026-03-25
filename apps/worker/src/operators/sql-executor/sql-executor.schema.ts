import { z } from 'zod';

export const SqlExecutorSchema = z.object({
  name: z.literal('SqlExecutor'),
  options: z.object(),
});

export type SqlExecutorOptions = z.infer<typeof SqlExecutorSchema>['options'];
