module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error','windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  },
  overrides: [
    {
      files: ['server/**/*.{ts,js}'],
      ...require('./config/.eslintrc.back.js'),
    },
    {
      files: ['admin/**/*.{ts,js}'],
      ...require('./config/.eslintrc.front.js'),
    },
  ],
};
