import dotProp from 'dot-prop';
import Handlebars from 'handlebars';

export function compile(options: Record<string, unknown>, ...paths: string[]) {
  if (!options) return {};

  return Object.fromEntries(paths.map((path) => [path, Handlebars.compile(dotProp.get(options, path))]));
}
