import { defineConfig, loadEnv, type Plugin, type ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// TMDB недоступен напрямую из части сетей (блокировка DNS), поэтому фронтенд ходит на /tmdb/*.
// prod: Vercel rewrites (vercel.json). dev: по умолчанию напрямую в TMDB; если он недоступен,
// TMDB_PROXY_TARGET в .env (например, https://films-fsd.vercel.app) направляет /tmdb на задеплоенный сайт.
// Без таймаута запрос к недоступному хосту висит минутами; с ним dev быстро получает ошибку
const PROXY_TIMEOUT_MS = 10_000

const createTmdbProxy = (target?: string): Record<string, ProxyOptions> => {
  const base = { changeOrigin: true, proxyTimeout: PROXY_TIMEOUT_MS }

  if (target) return { '/tmdb': { ...base, target } }

  const api = 'https://api.themoviedb.org'
  const img = 'https://image.tmdb.org'
  return {
    '/tmdb/api': {
      ...base,
      target: api,
      rewrite: (path) => path.replace(/^\/tmdb\/api/, '/3')
    },
    '/tmdb/img': {
      ...base,
      target: img,
      rewrite: (path) => path.replace(/^\/tmdb\/img/, '/t/p')
    }
  }
}

// Показывает при старте dev-сервера, куда реально уходят запросы /tmdb
const tmdbProxyLogger = (): Plugin => ({
  name: 'tmdb-proxy-logger',
  apply: 'serve',
  configureServer(server) {
    const proxy = server.config.server.proxy?.['/tmdb']
    const target = typeof proxy === 'object' ? proxy.target : 'напрямую в TMDB'
    server.config.logger.info(`  [tmdb-proxy] /tmdb → ${String(target)}`)
  }
})

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tmdbProxyLogger(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon-96x96.png', 'apple-touch-icon.png'],
      manifest: {
        id: '/',
        name: 'Кино Трекер',
        short_name: 'КиноТрекер',
        description: 'Твой личный список фильмов в одном месте!',
        lang: 'ru',
        // Статичны (тема переключается в рантайме): значения тёмной темы по умолчанию.
        // Актуальный theme-color выставляет ThemeSnackbarProvider через <meta>.
        theme_color: '#1c1c1c',
        background_color: '#0d0d0d',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          // Отдельные maskable-иконки: рисунок в safe-zone (≈66%), фон на весь холст
          {
            src: '/pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        // Статика (js/css/html/иконки) попадает в precache и обновляется вместе со сборкой
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        navigateFallbackDenylist: [/^\/tmdb\//],
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          // Каталожные запросы TMDB (через прокси /tmdb/api); account/auth не кешируем
          {
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin &&
              url.pathname.startsWith('/tmdb/api/') &&
              !/^\/tmdb\/api\/(account|authentication)\//.test(url.pathname),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              },
              cacheableResponse: {
                statuses: [200]
              }
            }
          },
          // Шрифты: кешируются по факту использования (нужные сабсеты), а не все сразу
          {
            urlPattern: /\.woff2?$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          // Постеры и бэкдропы TMDB (через прокси /tmdb/img, same-origin)
          {
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin && url.pathname.startsWith('/tmdb/img/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [200]
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    open: true,
    proxy: createTmdbProxy(loadEnv(mode, process.cwd(), '').TMDB_PROXY_TARGET)
  },
  // console/debugger вырезаются только в production-сборке
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    // esbuild — встроен в Vite (terser не был объявлен в package.json, а подтягивался как peer)
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    // Отчет о производительности сборки
    reportCompressedSize: true,
    // Настройки CSS
    cssCodeSplit: true,
    // Включаем CSS минификацию
    cssMinify: true,
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 10000,
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Оптимизация шрифтов
            if (id.includes('/fonts/') || id.includes('@fontsource')) return 'vendor_fonts'

            // MUI и иконки
            if (id.includes('@mui/icons-material')) return 'vendor_mui_icons'
            if (id.includes('@mui/material')) return 'vendor_mui_core'

            // React и связанные библиотеки
            if (id.includes('react-dom')) return 'vendor_react_dom'
            if (id.includes('react-router')) return 'vendor_router'
            if (id.includes('react-query') || id.includes('@tanstack/react-query'))
              return 'vendor_query'
            if (id.includes('react')) return 'vendor_react'

            // Другие крупные библиотеки
            if (id.includes('lodash')) return 'vendor_lodash'
            return 'vendor_other'
          }

          // Код приложения (src/) не группируем по FSD-слоям: страницы подгружаются лениво
          // (app/router.tsx), и группировка склеила бы их в один чанк, загружаемый сразу.
        },
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: ({ name }) => {
          // Отдельная обработка для разных типов файлов
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]'
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  optimizeDeps: {
    // Оптимизация зависимостей
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      'react-router-dom',
      '@tanstack/react-query'
    ],
    exclude: ['@babel/runtime'],
    // Принудительная оптимизация, полезно при наличии проблем с динамическим импортом
    force: false,
    // Оптимизация динамически импортируемых зависимостей
    esbuildOptions: {
      target: 'es2020',
      // Исправление проблем с импортами при сборке
      preserveSymlinks: false,
      // Поддержка JSX
      jsx: 'automatic',
      // Минимизация
      minify: true
    }
  }
}))
