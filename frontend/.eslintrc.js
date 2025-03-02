module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier', // この行を追加
  ],
  plugins: ['prettier'], // この行を追加
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        printWidth: 80,
        trailingComma: 'es5',
      },
    ],
  },
}
