import { createRoute } from "@hono/zod-openapi";
import {
  createMessageObjectSchema,
} from "stoker/openapi/schemas";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { CreditReportSchema } from "@/shared/schemas";

export type GetRoute = typeof get;

export const get = createRoute({
  method: "get",
  path: "/credit",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(CreditReportSchema, "Credit Report"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema("Not Found"),
      "Not Found",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema("Internal Server Error"),
      "Internal Server Error",
    ),
  },
});