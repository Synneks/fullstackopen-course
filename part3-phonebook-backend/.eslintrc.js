module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    eqeqeq: 'error',
    'no-console': 0,
  },
};
