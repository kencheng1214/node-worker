import dotProp from 'dot-prop';
import Handlebars from 'handlebars';
import { PipelineContext } from '../app.interface';

type RenderFunction<Options, Key extends string> =
  NonNullable<Options[Key extends keyof Options ? Key : never]> extends readonly string[]
    ? (data?: any) => string[]
    : (data?: any) => string;

export type Output<Options extends Record<string, unknown>, Paths extends readonly string[]> = Partial<{
  [Key in Paths[number] as `${Uppercase<Key>}_TEMPLATE`]: RenderFunction<Options, Key>;
}>;

export function compile<Options extends Record<string, unknown>, const Paths extends readonly string[]>(
  context: PipelineContext,
  options: Options,
  paths: Paths,
): Output<Options, Paths> {
  const output: Output<Options, Paths> = {};

  for (const path of paths) {
    const input = dotProp.get(options, path);

    if (!input) continue;

    const template = Array.isArray(input) ? input.map((value) => Handlebars.compile(value)) : Handlebars.compile(input);
    const key = `${path.toUpperCase()}_TEMPLATE` as keyof Output<Options, Paths>;
    const value = Array.isArray(template)
      ? (data?: any) => template.map((template) => template({ ...data, $: context }))
      : (data?: any) => template({ ...data, $: context });

    output[key] = value as Output<Options, Paths>[typeof key];
  }

  return output;
}
