import path from 'node:path';

export const pactConfig = {
  consumer: 'CreditInsightsWeb',
  provider: 'CreditInsightsAPI',
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'src/api'),
  logLevel: 'warn',
  spec: 2,
};

// eslint-disable-next-line import/no-default-export -- required for pact
export default pactConfig;
