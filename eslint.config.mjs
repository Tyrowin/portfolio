import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      '.next/**/*',
      'node_modules/**/*',
      'dist/**/*',
      'build/**/*',
      'out/**/*',
      'public/**/*',
      '*.config.js',
      '*.config.mjs',
      'next-env.d.ts',
    ],
  },
  eslint.configs.recommended,
  stylistic.configs.customize({
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'as-needed',
    trailingComma: 'es5',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'avoid',
    printWidth: 80,
    endOfLine: 'lf',
  }),
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // ESLint
    rules: {
      'no-constant-condition': [
        'error',
        {
          checkLoops: 'allExceptWhileTrue',
        },
      ],
    },
  },
  {
    // TypeScript
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        {
          allowConstantLoopConditions: true,
        },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        {
          ignorePrimitives: {
            boolean: true,
          },
        },
      ],
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        {
          allowNumberAndString: true,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],
    },
  },
  {
    // Stylistic
    rules: {
      '@stylistic/arrow-parens': 'off',
      '@stylistic/eol-last': 'error',
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
          },
        },
      ],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-multi-spaces': [
        'error',
        {
          ignoreEOLComments: true,
        },
      ],
      '@stylistic/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],
    },
  },
  prettierConfig
);
