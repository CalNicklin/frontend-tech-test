import { config } from 'dotenv';

// Try to load from .env.test first
config({ path: '.env.test' });

// Set fallback values for required environment variables
process.env.LOG_LEVEL = process.env.LOG_LEVEL ?? 'error';
process.env.CREDIT_REPORT_API_URL = process.env.CREDIT_REPORT_API_URL ?? 'http://localhost:3000';
process.env.INSIGHT_API_URL = process.env.INSIGHT_API_URL ?? 'http://localhost:3000';
process.env.PORT = process.env.PORT ?? '3000';
process.env.NODE_ENV = process.env.NODE_ENV ?? 'test';
