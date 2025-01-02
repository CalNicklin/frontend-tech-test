import { createRouter } from '../../lib/create-app';
import * as routes from './credit.route';
import * as handlers from './credit.handler';

const router = createRouter(true).openapi(routes.get, handlers.get);

// eslint-disable-next-line import/no-default-export -- default export is required for the router
export default router;
