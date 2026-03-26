import { PipelineContext } from '../app.interface';

export function render(context: PipelineContext, path: string, data?) {
  const { templates, ...$ } = context;
  const template = context.templates[path];

  data = { ...data, $ };
  if (Array.isArray(template)) return template.map((template) => template(data));
  return template(data);
}
