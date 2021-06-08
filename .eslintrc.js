const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-var-requires': OFF,
    'prettier/prettier': [
      ERROR,
      {
        semi: false,
        arrowParens: 'avoid',
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: 'none',
        jsxBracketSameLine: true,
        embeddedLanguageFormatting: 'auto'
      }
    ],
    quotes: [ERROR, 'single'], // 强制使用单引号
    semi: [ERROR, 'never'],
    'jsx-quotes': [ERROR, 'prefer-single'],
    'no-console': process.env.NODE_ENV === 'production' ? WARN : OFF,
    'no-debugger': process.env.NODE_ENV === 'production' ? WARN : OFF
  }
}
