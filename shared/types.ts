import type { z } from "zod";
import type { CreditReportSchema } from "./schemas";

export type CreditReport = z.infer<typeof CreditReportSchema>;
