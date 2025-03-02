module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // カスタムルールを追加可能
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': 'warn'
  }
};