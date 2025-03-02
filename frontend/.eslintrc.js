module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'prettier/prettier': [
      'warn', // errorからwarnに変更
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
