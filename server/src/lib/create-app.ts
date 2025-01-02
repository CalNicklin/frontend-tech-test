import { OpenAPIHono } from '@hono/zod-openapi';
import { onError, notFound} from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';
import { pinoLogger } from '../middlewares/pino-logger';
import { type AppBindings } from '../types';

export function createRouter(skipBasePath = false): OpenAPIHono<AppBindings> {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  }).basePath(skipBasePath ? '' : '');
}

export function createApp(): OpenAPIHono<AppBindings> {
  const app = createRouter();

  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}