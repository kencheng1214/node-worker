import { z } from 'zod';
import { SpecificationSchema } from './app.constant';

export type Specification = z.infer<typeof SpecificationSchema>;

export interface Executable<I = unknown, O = unknown, Opt = Record<string, any>> {
  execute(input: I, options?: Opt): O | Promise<O>;
}
