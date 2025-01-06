/* eslint-disable no-console -- we want to log errors to the console at this stage, pre client build */
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  CREDIT_REPORT_API_URL: z.string().url(),
  INSIGHTS_API_URL: z.string().url(),
  SENTRY_DSN: z.string().url(),
});

export type Env = z.infer<typeof EnvSchema>;

// Helper function to get environment variables
const getEnvVars = () => {
  // Check if we're in Vite context
  if (typeof import.meta.env !== 'undefined') {
    return {
      NODE_ENV: import.meta.env.MODE,
      CREDIT_REPORT_API_URL: import.meta.env
        .VITE_CREDIT_REPORT_API_URL as string,
      INSIGHTS_API_URL: import.meta.env.VITE_INSIGHTS_API_URL as string,
      SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN as string,
    };
  }

  // Fallback to process.env for Node.js environment (playwright etc)
  return {
    NODE_ENV: process.env.NODE_ENV,
    CREDIT_REPORT_API_URL: process.env.VITE_CREDIT_REPORT_API_URL,
    INSIGHTS_API_URL: process.env.VITE_INSIGHTS_API_URL,
    SENTRY_DSN: process.env.VITE_SENTRY_DSN,
  };
};

const { data: parsedEnv, error } = EnvSchema.safeParse(getEnvVars());

if (error) {
  console.error('❌ Invalid env:');
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  throw error;
}

export const env = parsedEnv;
