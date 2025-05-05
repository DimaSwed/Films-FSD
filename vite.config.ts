import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(() => ({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Кино Трекер',
        short_name: 'КиноТрекер',
        description: 'Твой личный список фильмов в одном месте!',
        theme_color: '#ffffff',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/films-fsd\.vercel\.app\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Кеширование статических ресурсов
          {
            urlPattern: /\.(?:js|css|woff2?)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          },
          // Кеширование изображений
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ],
        // Предварительное кеширование главных ресурсов
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        skipWaiting: true,
        clientsClaim: true
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug', 'console.log']
      },
      mangle: {
        safari10: true // Улучшение совместимости
      },
      format: {
        comments: false
      }
    },
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

          // Разделение кода приложения на логические модули
          if (id.includes('/src/features/')) return 'features'
          if (id.includes('/src/entities/')) return 'entities'
          if (id.includes('/src/shared/')) return 'shared'
          if (id.includes('/src/pages/')) return 'pages'
          if (id.includes('/src/widgets/')) return 'widgets'
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
