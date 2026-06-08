import { LogLevel } from '@nestjs/common';

export const getLogLevels = (isProduction: boolean): LogLevel[] => {
  return isProduction
    ? ['error', 'warn', 'log']
    : ['error', 'warn', 'log', 'verbose', 'debug'];
};
