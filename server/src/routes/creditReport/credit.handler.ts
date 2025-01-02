import { type AppRouteHandler } from "../../types";
import { dataService } from "../../services/data-service";
import { type GetRoute } from "./credit.route";

export const get: AppRouteHandler<GetRoute> = (c) => {
  const report = dataService.getCreditReport();
  if (!report) {
    return c.json({ message: "No report found" }, 404);
  }
  if (report instanceof Error) {
    return c.json({ message: report.message }, 500);
  }
  return c.json(report, 200);
};