import { z } from 'zod';
import { SpecificationSchema } from './app.constant';

export type Specification = z.infer<typeof SpecificationSchema>;

export interface Executable<I = unknown, O = unknown> {
  execute(input: I, options?: Record<string, any>): O | Promise<O>;
}
