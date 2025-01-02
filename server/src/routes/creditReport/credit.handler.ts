import { type AppRouteHandler } from "../../types";
import { dataService } from "../../services/data-service";
import { sduiService } from "../../services/sdui-service";
import { type GetRoute } from "./credit.route";

export const get: AppRouteHandler<GetRoute> = (c) => {
  const report = dataService.getCreditReport();

  if (!report || report instanceof Error) {
    return c.json({ message: 'Report not available' }, 503);
  }

  const schema = sduiService.generateSchema(report);
  return c.json(schema, 200);
};
