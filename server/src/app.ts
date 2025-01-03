/* eslint-disable no-console -- intentionally logging to console */
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { DataService } from './services/data-service';
import { createApp } from './lib/create-app';
import creditReportRouter from './routes/creditReport/credit.index';

const port = process.env.PORT ?? 3000;

async function startServer() {
  try {
    console.log('Starting server initialization...');

    const dataService = DataService.getInstance();
    await dataService.init();

    const app = createApp();

    app.use('*', logger());
    app.use('*', prettyJSON());
    app.use(
      '*',
      cors({
        origin: 'http://localhost:5173',
        credentials: true,
      }),
    );

    const routes = [creditReportRouter];
    routes.forEach((route) => {
      app.route('/', route);
    });

    serve(
      {
        fetch: app.fetch,
        port: Number(port),
      },
      () => {
        console.log(`🚀 Server is running on port:${String(port)}`);
      },
    );
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

void startServer();
