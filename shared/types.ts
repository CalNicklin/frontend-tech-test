import type { z } from "zod";
import type { CreditReportSchema, SduiSchema } from "./schemas";

export type CreditReport = z.infer<typeof CreditReportSchema>;

export type SduiSchema = z.infer<typeof SduiSchema>;