import { Provider, Type } from '@nestjs/common';
import { Executable } from '../app.interface';

export function registerOperators(...operators: Type<Executable>[]): Provider[] {
  return operators.map((operator) => ({ provide: operator.name, useClass: operator }));
}
