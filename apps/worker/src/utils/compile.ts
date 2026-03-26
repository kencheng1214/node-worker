import dotProp from 'dot-prop';
import Handlebars from 'handlebars';
import { PipelineContext } from '../app.interface';

export function compile(input: string): ReturnType<typeof Handlebars.compile>;
export function compile(
  options: Record<string, unknown>,
  ...paths: string[]
): Record<string, ReturnType<typeof Handlebars.compile>>;
export function compile(
  inputOrOptions: string | Record<string, unknown>,
  ...paths: string[]
): ReturnType<typeof Handlebars.compile> | Record<string, ReturnType<typeof Handlebars.compile>> {
  if (typeof inputOrOptions === 'string') return Handlebars.compile(inputOrOptions);
  if (!inputOrOptions) return {};

  return Object.fromEntries(paths.map((path) => [path, Handlebars.compile(dotProp.get(inputOrOptions, path))]));
}

export function compile2(context: PipelineContext, options = {}, ...paths: string[]) {
  for (const path of paths) {
    const value = dotProp.get(options, path);

    if (!value) continue;
    context.templates[path] = Array.isArray(value)
      ? value.map((value) => Handlebars.compile(value))
      : Handlebars.compile(value);
  }
}
