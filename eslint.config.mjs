import { FlatCompat } from '@eslint/eslintrc';
import perfectionist from 'eslint-plugin-perfectionist';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:storybook/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
  ),
  {
    plugins: {
      perfectionist,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // TODO: 추후 제거
      '@typescript-eslint/no-empty-object-type': 'off', // TODO: 추후 제거
      'perfectionist/sort-imports': [
        'error',
        {
          customGroups: [
            {
              groupName: 'next',
              elementNamePattern: ['^next$', '^next/.+', '^@next/.+'],
            },
            {
              groupName: 'react',
              elementNamePattern: ['^react$', '^react-dom/.+'],
            },
            {
              groupName: 'api',
              elementNamePattern: ['@/actions/.+', '@/services/.+'],
            },
            {
              groupName: 'app',
              elementNamePattern: [],
            },
            {
              groupName: 'components',
              elementNamePattern: ['@/components/.+', '@/layouts/.+'],
            },
            {
              groupName: 'utils',
              elementNamePattern: ['@/libs/.+', '@/hooks/.+', '@/utils/.+', '@/store/.+', '@/constants'],
            },
            {
              groupName: 'types',
              elementNamePattern: ['@/types/.+'],
            },
          ],
          groups: [
            'next',
            'react',
            'type-import',
            ['value-builtin', 'value-external'],
            'value-internal',
            'app',
            'api',
            'components',
            'utils',
            'type-internal',
            'types',
            ['value-parent', 'value-sibling', 'value-index'],
            ['type-parent', 'type-sibling', 'type-index'],
            'value-style',
            'unknown',
          ],
          ignoreCase: true,
          newlinesBetween: 'always',
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          customGroups: [
            {
              elementNamePattern: '^on.+',
              groupName: 'callback',
            },
            {
              elementNamePattern: '^key$',
              groupName: 'key',
            },
            {
              elementNamePattern: '^ref$',
              groupName: 'ref',
            },
          ],
          groups: ['shorthand-prop', 'key', 'ref', 'unknown', 'callback', 'multiline-prop'],
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-named-imports': 'error',
      'perfectionist/sort-array-includes': 'error',
      'perfectionist/sort-classes': 'error',
      'perfectionist/sort-enums': 'error',
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-maps': 'error',
      'perfectionist/sort-named-exports': 'error',
      'perfectionist/sort-object-types': 'error',
      'perfectionist/sort-union-types': 'error',
    },
  },
];

export default eslintConfig;
