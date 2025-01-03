import { randomUUID } from 'node:crypto';
import { pinoLogger as logger } from 'hono-pino';
import * as pino from 'pino';
import pretty from 'pino-pretty';
import { env } from '@server/env';

export function pinoLogger() {
  return logger({
    pino: pino.default(
      {
        level: env.LOG_LEVEL,
      },
      env.NODE_ENV === 'development' ? pretty() : undefined,
    ),
    http: {
      reqId: () => randomUUID(),
    },
  });
}
