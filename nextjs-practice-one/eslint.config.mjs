import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import { fixupConfigRules } from '@eslint/compat';

// Get the current file name in an ES module environment
const __filename = fileURLToPath(import.meta.url);
// Get the directory name of the current module
const __dirname = path.dirname(__filename);
// Create an instance of FlatCompat for compatibility with older ESLint config formats
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Apply patches to the ESLint config for 'next/core-web-vitals' rules
const patchedConfig = fixupConfigRules([
  ...compat.extends('next/core-web-vitals'),
]);

const config = [
  ...patchedConfig,
  ...ts.configs.recommended,
  prettierConfigRecommended,
  { ignores: ['.next/*', 'dist'] },
  {
    rules: {
      'react/display-name': 0,
      'no-console': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'react/self-closing-comp': [
        'warn',
        {
          component: true,
          html: true,
        },
      ],
    },
  },
];

export default config;
