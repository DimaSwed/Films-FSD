import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

// Steiger проверяет структуру слайсов. Правила про импорты между слоями/слайсами и
// публичное API уже проверяет ESLint (@conarti/eslint-plugin-feature-sliced, см. eslint.config.js),
// поэтому здесь они выключены — иначе одна проблема считается дважды.
// Конфиг — .js, не .ts: .ts не загружается на Node 22.14 при "type": "module".
export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ['./src/**'],
    rules: {
      'fsd/forbidden-imports': 'off',
      'fsd/no-public-api-sidestep': 'off',
      'fsd/public-api': 'off',
      'fsd/no-layer-public-api': 'off'
    }
  }
])
