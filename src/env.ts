/* eslint-disable no-console -- we want to log errors to the console at this stage, pre client build */
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  CREDIT_REPORT_API_URL: z.string().url(),
  INSIGHTS_API_URL: z.string().url(),
});

export type Env = z.infer<typeof EnvSchema>;

const { data: parsedEnv, error } = EnvSchema.safeParse({
  NODE_ENV: import.meta.env.MODE,
  CREDIT_REPORT_API_URL: import.meta.env.VITE_CREDIT_REPORT_API_URL as string,
  INSIGHTS_API_URL: import.meta.env.VITE_INSIGHTS_API_URL as string,
});

if (error) {
  console.error('❌ Invalid env:');
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  throw error;
}

export const env = parsedEnv;
