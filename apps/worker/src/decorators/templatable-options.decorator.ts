export const TEMPLATABLE_OPTIONS_METADATA = 'TEMPLATABLE_OPTIONS_METADATA';

export const TemplatableOptions: (...paths: string[]) => ClassDecorator = (...paths: string[]) => {
  return (target: object) => {
    Reflect.defineMetadata(TEMPLATABLE_OPTIONS_METADATA, paths, target);
  };
};
