import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import pluginQuery from '@tanstack/eslint-plugin-query'
import prettier from 'eslint-plugin-prettier'
import featureSliced from '@conarti/eslint-plugin-feature-sliced'

export default [
  // Base config
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Ignore patterns
  { ignores: ['dist'] },

  // TypeScript/React config
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.eslint.json'
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      query: pluginQuery,
      prettier: prettier
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          singleQuote: true,
          trailingComma: 'none',
          bracketSpacing: true,
          tabWidth: 2,
          semi: false
        }
      ],
      ...pluginQuery.configs['flat/recommended'].rules
    }
  },

  // Границы FSD. Нарушений в проекте 0 — любое новое нарушение это error
  {
    ...featureSliced({
      severity: 'error',
      // Импорт порядка отдаёт prettier/ручной стиль — не переписываем все файлы
      sortImports: false,
      // 'segments' ловит и импорты вида @/pages/home/HomePage (файл в корне слайса).
      // Нестандартных сегментов нет: только ui, model, lib, api, config, assets
      publicApi: { level: 'segments' }
    }),
    files: ['src/**/*.{ts,tsx}']
  },

  // shared не имеет слайсов, плагин выше его сегменты не проверяет:
  // сегмент shared импортируется только через свой index.ts (@/shared/ui, а не @/shared/ui/skeleton)
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/shared/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/shared/*/*', '!@/shared/assets/**'],
              message: 'Импортируйте сегмент shared через его index.ts (например, @/shared/ui).'
            }
          ]
        }
      ]
    }
  }
]
