const { resolve } = require('node:path');

const appProject = resolve(__dirname, './tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react'),
  ],
  parserOptions: {
    project: [appProject],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: [appProject],
      },
    },
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off"
  }
};