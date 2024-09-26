const path = require('path')
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion : 'latest'
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: { 
    node: true,
    jest: true,
    es2021 : true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'eqeqeq' : [2, 'allow-null'], // == 금지
    'no-empty': ['error', {'allowEmptyCatch': false}], // catch 에서 무조건 에러 처리
    'array-element-newline' : ['error', {'ArrayExpression':{'multiline':true, 'minItems':3}}], // 배열 요소 개수 줄바꿈
    'camelcase' : ['error', {'properties':'never'}], // 변수 카멜케이스
    'prettier/prettier': [
      'error',
      {
          endOfLine: 'auto',
      },
    ],
  },
};
