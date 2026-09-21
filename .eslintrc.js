module.exports = {
  root: true,

  extends: ['@react-native', 'prettier'],

  plugins: ['i18next', 'prettier'],

  rules: {
    'prettier/prettier': 'error',
    'react-native/no-inline-styles': 'off',

    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        ignoreCallee: ['t'],
        ignoreAttribute: [
          'accessibilityHint',
          'accessibilityLabel',
          'id',
          'key',
          'name',
          'role',
          'testID',
        ],
      },
    ],

    //'no-console': 'error',

    '@typescript-eslint/no-explicit-any': 'warn',

    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    'no-var': 'error',
    'prefer-const': 'error',

    'react-hooks/exhaustive-deps': 'warn',
  },
}
