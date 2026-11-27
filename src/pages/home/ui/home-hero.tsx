import StarIcon from '@mui/icons-material/Star'
import { Box, Button, Skeleton, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FC, TouchEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { movieTrailerOptions, TrailerButton } from '@/entities/movie'
import { clampLines, getTmdbImageUrl, IMovie, visuallyHidden } from '@/shared/lib'

import { homeHeroStyles as styles } from './home-hero.styles'

interface IHomeHeroProps {
  /** Фильмы «в тренде»: в баннер попадают первые с кадром. */
  movies: IMovie[]
  isLoading: boolean
}

const FEATURED_COUNT = 5
/** Минимальный сдвиг пальца, который считается свайпом, а не случайным касанием. */
const SWIPE_THRESHOLD = 50

/** Кадр под ширину экрана: на телефоне хватает 780 px, на широком — 1280. */
const getBackdropProps = (path: string) => ({
  src: getTmdbImageUrl(path, 'w1280'),
  srcSet: `${getTmdbImageUrl(path, 'w780')} 780w, ${getTmdbImageUrl(path, 'w1280')} 1280w`,
  sizes: '(max-width: 900px) 100vw, 80vw'
})

/** Загружает кадр заранее: при переключении он появится сразу, без пустого баннера. */
const preloadBackdrop = (movie: IMovie | undefined) => {
  if (!movie?.backdropPath) return
  const { src, srcSet, sizes } = getBackdropProps(movie.backdropPath)
  const image = new Image()
  // `sizes` и `srcset` — до `src`, иначе браузер начнёт грузить крупный вариант
  image.sizes = sizes
  image.srcset = srcSet
  image.src = src
}

/**
 * Баннер главной: фильм из «трендов недели» на фоне кадра, описание и кнопки.
 * Переключается миниатюрами (широкий экран), точками или свайпом (телефон). Сам не листается:
 * автосмена отвлекает и требует кнопки паузы (WCAG 2.2.2).
 */
export const HomeHero: FC<IHomeHeroProps> = ({ movies, isLoading }) => {
  const featured = movies.filter((movie) => movie.backdropPath).slice(0, FEATURED_COUNT)
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const movie = featured[Math.min(index, featured.length - 1)] as IMovie | undefined
  // Трейлер — отдельный запрос `/videos`; кэш общий со страницей «Трейлеры»
  const { data: trailer } = useQuery({ ...movieTrailerOptions(movie?.id ?? 0), enabled: !!movie })

  if (isLoading) return <Skeleton variant="rectangular" animation="wave" sx={styles.skeleton} />
  if (!movie) return null

  const position = featured.indexOf(movie)
  const go = (step: -1 | 1) => setIndex((position + step + featured.length) % featured.length)

  // Касания внутри портала (окно трейлера) всплывают сюда по дереву React, хотя в DOM окно
  // вне баннера: без этой проверки свайп в окне переключал бы фильм и закрывал трейлер
  const isInsideBanner = (event: TouchEvent) => event.currentTarget.contains(event.target as Node)

  const onTouchStart = (event: TouchEvent) => {
    if (!isInsideBanner(event)) return
    touchStartX.current = event.touches[0].clientX
  }
  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null || !isInsideBanner(event)) return
    const dx = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) >= SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1)
  }

  const genres = movie.genre.split(', ').filter(Boolean).slice(0, 2)
  const next = featured[(position + 1) % featured.length]

  return (
    <Box
      component="section"
      aria-label="В тренде недели"
      sx={styles.root}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Box
        key={movie.id}
        component="img"
        {...getBackdropProps(movie.backdropPath as string)}
        alt=""
        fetchPriority={position === 0 ? 'high' : 'auto'}
        // Проявляется после загрузки, а не «доезжает» сверху вниз; заодно грузим следующий кадр
        onLoad={(event) => {
          event.currentTarget.dataset.loaded = 'true'
          if (next !== movie) preloadBackdrop(next)
        }}
        sx={styles.backdrop}
      />
      <Box aria-hidden sx={styles.shade} />

      <Box key={`content-${movie.id}`} sx={styles.content}>
        <Box sx={styles.eyebrow}>
          <Box component="span" aria-hidden sx={styles.eyebrowDot} />В тренде недели ·{' '}
          {position + 1} из {featured.length}
        </Box>

        <Typography variant="h1" component="h2" sx={{ ...styles.title, ...clampLines(3) }}>
          {movie.title}
        </Typography>

        <Box sx={styles.meta}>
          {movie.rating > 0 && (
            <Box component="span" sx={styles.rating}>
              <StarIcon aria-hidden sx={{ fontSize: 18, color: 'warning.light' }} />
              <span style={visuallyHidden}>Рейтинг TMDB</span>
              {movie.rating.toFixed(1)}
            </Box>
          )}
          {movie.year > 0 && <span>{movie.year}</span>}
          {genres.length > 0 && <span>{genres.join(', ')}</span>}
        </Box>

        {movie.description && (
          <Typography
            variant="body1"
            // На телефоне 2 строки: иначе текст закрывает весь кадр
            sx={{ ...styles.description, ...clampLines(3), WebkitLineClamp: { xs: 2, sm: 3 } }}
          >
            {movie.description}
          </Typography>
        )}

        <Box sx={styles.actions}>
          <Button
            variant="contained"
            component={Link}
            to={`/movie/${movie.id}`}
            sx={styles.primaryButton}
          >
            Подробнее о фильме
          </Button>
          {trailer && <TrailerButton trailer={trailer} title={movie.title} />}
        </Box>

        {featured.length > 1 && (
          <Box role="group" aria-label="Выбор фильма" sx={styles.dots}>
            {featured.map((item, itemIndex) => (
              <Box
                key={item.id}
                component="button"
                type="button"
                aria-label={item.title}
                aria-pressed={itemIndex === position}
                onClick={() => setIndex(itemIndex)}
                onFocus={() => preloadBackdrop(item)}
                sx={styles.dot}
              />
            ))}
          </Box>
        )}
      </Box>

      {featured.length > 1 && (
        <Box component="ul" aria-label="Выбор фильма" sx={styles.thumbs}>
          {featured.map((item, itemIndex) => (
            <li key={item.id}>
              <Box
                component="button"
                type="button"
                aria-label={item.title}
                aria-pressed={itemIndex === position}
                onClick={() => setIndex(itemIndex)}
                onPointerEnter={() => preloadBackdrop(item)}
                onFocus={() => preloadBackdrop(item)}
                sx={styles.thumb}
              >
                {item.image && <img src={item.image} alt="" loading="lazy" />}
              </Box>
            </li>
          ))}
        </Box>
      )}
    </Box>
  )
}
