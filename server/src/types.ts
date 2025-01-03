import {
  type RouteConfig,
  type RouteHandler,
} from '@hono/zod-openapi';
import { type PinoLogger } from 'hono-pino';
import { type z } from 'zod';
import { type Status } from '@/shared/schemas';

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

export type Status = z.infer<typeof Status>['value']