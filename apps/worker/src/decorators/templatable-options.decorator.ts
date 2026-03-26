export const TEMPLATABLE_OPTIONS_PATHS = 'TEMPLATABLE_OPTIONS_PATHS';

export const TemplatableOptions: (...paths: string[]) => ClassDecorator = (...paths: string[]) => {
  return (target: object) => {
    Reflect.defineMetadata(TEMPLATABLE_OPTIONS_PATHS, paths, target);
  };
};
