import { createRouter } from '../../lib/create-app';
import * as routes from './credit.route';
import * as handlers from './credit.handler';

const router = createRouter(true).openapi(routes.get, handlers.get);

export default router;
