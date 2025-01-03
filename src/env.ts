/* eslint-disable no-console -- we want to log errors to the console at this stage, pre client build */
import path from 'node:path';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';

expand(
  config({
    path: path.resolve(
      process.cwd(),
      process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    ),
  }),
);

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  API_URL: z.string().url(),
});

export type Env = z.infer<typeof EnvSchema>;

const { data: parsedEnv, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error('❌ Invalid env:');
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

// Since we exit the process if there's an error,
// we can safely assert that parsedEnv exists here
export const env = parsedEnv;
