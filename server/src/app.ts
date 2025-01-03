/* eslint-disable no-console -- intentionally logging to console */
import { serve } from '@hono/node-server'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { DataService } from "./services/data-service";
import { createApp } from './lib/create-app';
import creditReportRouter from './routes/creditReport/credit.index';

const dataService = new DataService();
const port = process.env.PORT ?? 3000;

// Initialize polling when server starts
dataService.init().catch((error: unknown) => { console.error(error); });

export const app = createApp();

app.use('*', logger())
app.use('*', prettyJSON())

const routes = [creditReportRouter];

routes.forEach((route) => {
  app.route('/', route);
});

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello World!',
  });
});

serve({
  fetch: app.fetch,
  port: Number(port)
}, () => {
  console.log(`🚀 Server is running on port:${String(port)}`);
});