import StarIcon from '@mui/icons-material/Star'
import { Box, Button, Link, Tab, Tabs, Typography } from '@mui/material'
import { FC, useEffect, useId, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { isGoodRating, visuallyHidden } from '@/shared/lib'

import { getLocalIsoDate } from '../lib'
import type { IPersonCredit, IPersonCreditGroup } from '../model'

import { personFilmographyStyles as styles } from './person-filmography.styles'

interface IPersonFilmographyProps {
  groups: IPersonCreditGroup[]
}

/** Сколько фильмов показывать сразу: у актёров бывает за двести. */
const INITIAL_LIMIT = 40

/** Записи подряд по годам; без даты — отдельной группой в конце (порядок уже задан в данных). */
const groupByYear = (credits: IPersonCredit[]) => {
  const years: { year: number; credits: IPersonCredit[] }[] = []
  for (const credit of credits) {
    const last = years[years.length - 1]
    if (last?.year === credit.movie.year) last.credits.push(credit)
    else years.push({ year: credit.movie.year, credits: [credit] })
  }
  return years
}

interface ICreditRowProps {
  credit: IPersonCredit
  /** Сегодня в формате дат TMDB (`YYYY-MM-DD`). */
  today: string
}

const CreditRow: FC<ICreditRowProps> = ({ credit: { movie, roles }, today }) => {
  const isUpcoming = Boolean(movie.releaseDate && movie.releaseDate > today)

  return (
    <Box component="li" sx={styles.entry}>
      <Box sx={{ minWidth: 0 }}>
        <Link component={RouterLink} to={`/movie/${movie.id}`} sx={styles.title}>
          {movie.title}
        </Link>
        {isUpcoming && (
          <Typography component="span" variant="caption" sx={styles.soon}>
            скоро
          </Typography>
        )}
        {roles.length > 0 && (
          <Typography component="span" variant="body2" sx={styles.role}>
            {roles.join(', ')}
          </Typography>
        )}
      </Box>
      {movie.rating > 0 && (
        <Typography component="span" variant="body2" sx={styles.rating}>
          <Box component="span" sx={visuallyHidden}>
            рейтинг TMDB
          </Box>
          <StarIcon
            aria-hidden
            sx={{
              fontSize: 16,
              color: isGoodRating(movie.rating) ? 'success.main' : 'warning.main'
            }}
          />
          {movie.rating.toFixed(1)}
        </Typography>
      )}
    </Box>
  )
}

interface ICreditTimelineProps {
  credits: IPersonCredit[]
}

const CreditTimeline: FC<ICreditTimelineProps> = ({ credits }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const listRef = useRef<HTMLOListElement>(null)
  const shouldFocusRef = useRef(false)
  const visible = isExpanded ? credits : credits.slice(0, INITIAL_LIMIT)
  const today = getLocalIsoDate()

  // Кнопка «Показать все» исчезает: без этого фокус клавиатуры ушёл бы в начало страницы.
  // В каждой строке одна ссылка, поэтому первая из новых — ссылка с индексом INITIAL_LIMIT.
  useEffect(() => {
    if (!isExpanded || !shouldFocusRef.current) return
    shouldFocusRef.current = false
    listRef.current?.querySelectorAll('a')[INITIAL_LIMIT]?.focus()
  }, [isExpanded])

  const expand = () => {
    shouldFocusRef.current = true
    setIsExpanded(true)
  }

  return (
    <>
      <Box component="ol" ref={listRef} sx={styles.years}>
        {groupByYear(visible).map(({ year, credits: yearCredits }) => (
          <Box component="li" key={year} sx={styles.year}>
            <Typography variant="body1" sx={styles.yearLabel}>
              {year || '—'}
            </Typography>
            <Box
              component="ol"
              aria-label={year ? `${year} год` : 'Год не указан'}
              sx={styles.entries}
            >
              {yearCredits.map((credit) => (
                <CreditRow key={credit.movie.id} credit={credit} today={today} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      {credits.length > visible.length && (
        <Button variant="outlined" color="inherit" onClick={expand} sx={styles.showAll}>
          Показать все ({credits.length})
        </Button>
      )}
    </>
  )
}

/** Фильмография по направлениям работы (актёр, режиссёр…), внутри — лента по годам. */
export const PersonFilmography: FC<IPersonFilmographyProps> = ({ groups }) => {
  const baseId = useId()
  const [selected, setSelected] = useState(groups[0]?.department)
  const active = groups.find(({ department }) => department === selected) ?? groups[0]

  if (!active) return null

  const hasTabs = groups.length > 1
  // По индексу: названия отделов TMDB с пробелами («Costume & Make-Up») в id не годятся
  const tabId = (department: string) =>
    `${baseId}-tab-${groups.findIndex((group) => group.department === department)}`
  const panelId = `${baseId}-panel`

  return (
    <Box component="section" aria-labelledby={`${baseId}-title`}>
      <Typography id={`${baseId}-title`} variant="h4" component="h2" sx={{ mb: 1 }}>
        Фильмография
      </Typography>

      {hasTabs && (
        <Tabs
          value={active.department}
          onChange={(_event, value: string) => setSelected(value)}
          variant="scrollable"
          scrollButtons={false}
          textColor="inherit"
          aria-label="Направление работы"
          sx={styles.tabs}
        >
          {groups.map(({ department, label, credits }) => (
            <Tab
              key={department}
              value={department}
              id={tabId(department)}
              aria-controls={panelId}
              label={
                <span>
                  {label}{' '}
                  <Box component="span" sx={styles.tabCount}>
                    {credits.length}
                  </Box>
                </span>
              }
              sx={styles.tab}
            />
          ))}
        </Tabs>
      )}

      <Box
        id={panelId}
        role={hasTabs ? 'tabpanel' : undefined}
        aria-labelledby={hasTabs ? tabId(active.department) : undefined}
      >
        {/* key: при смене направления список снова свёрнут */}
        <CreditTimeline key={active.department} credits={active.credits} />
      </Box>
    </Box>
  )
}
