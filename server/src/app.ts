import { serve } from '@hono/node-server'
import { DataService } from "./services/data-service";
import { createApp } from './lib/create-app';
import { creditReportRouter } from './routes/creditReport/credit.index';

const dataService = new DataService();

// Initialize polling when server starts
dataService.init().catch(console.error);

export const app = createApp();

const routes = [creditReportRouter];

routes.forEach((route) => {
  app.route('/', route);
});

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello World!',
  });
});

serve(app)