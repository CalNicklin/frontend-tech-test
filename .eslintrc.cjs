const { resolve } = require('node:path');

const appProject = resolve(__dirname, './tsconfig.app.json');
const nodeProject = resolve(__dirname, './tsconfig.node.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react'),
  ],
  parserOptions: {
    project: [appProject, nodeProject],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: [appProject, nodeProject],
      },
    },
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off"
  }
};