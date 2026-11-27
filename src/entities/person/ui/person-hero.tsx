import PersonIcon from '@mui/icons-material/Person'
import { Box, Button, Typography } from '@mui/material'
import { FC, useId, useState } from 'react'

import { clampLines } from '@/shared/lib'

import { formatMovieCount, formatPersonDate, formatYears, getAge } from '../lib'
import type { IPersonDetails } from '../model'

import { personHeroStyles as styles } from './person-hero.styles'

interface IPersonHeroProps {
  person: IPersonDetails
}

/** Свёрнутая биография — столько строк; короче порога кнопку «Читать полностью» не показываем. */
const BIOGRAPHY_LINES = 5
const BIOGRAPHY_COLLAPSE_FROM = 450

const getFacts = (person: IPersonDetails) => {
  const age = getAge(person.birthday, person.deathday)
  const birthday = formatPersonDate(person.birthday)
  const deathday = formatPersonDate(person.deathday)

  return [
    {
      label: 'Дата рождения',
      // Возраст — у живущих при дате рождения, у умерших — при дате смерти
      value:
        birthday && (age !== null && !deathday ? `${birthday} · ${formatYears(age)}` : birthday)
    },
    {
      label: 'Дата смерти',
      value: deathday && (age !== null ? `${deathday} · в ${formatYears(age)}` : deathday)
    },
    { label: 'Место рождения', value: person.placeOfBirth },
    { label: 'В фильмографии', value: person.movieCount > 0 && formatMovieCount(person.movieCount) }
  ]
}

interface IPersonBiographyProps {
  text: string
}

const PersonBiography: FC<IPersonBiographyProps> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false)
  const textId = useId()
  const isLong = text.length > BIOGRAPHY_COLLAPSE_FROM

  if (!text) {
    return (
      <Typography variant="body2" sx={styles.biographyMissing}>
        Биографии на русском в TMDB пока нет.
      </Typography>
    )
  }

  return (
    <Box sx={styles.biography}>
      <Typography
        id={textId}
        variant="body1"
        sx={[styles.biographyText, isLong && !isOpen && clampLines(BIOGRAPHY_LINES)]}
      >
        {text}
      </Typography>
      {isLong && (
        <Button
          variant="text"
          aria-expanded={isOpen}
          aria-controls={textId}
          onClick={() => setIsOpen((value) => !value)}
          sx={styles.readMore}
        >
          {isOpen ? 'Свернуть' : 'Читать полностью'}
        </Button>
      )}
    </Box>
  )
}

/** Верх страницы человека: фото, имя, факты и биография на фоне кадра из самого известного фильма. */
export const PersonHero: FC<IPersonHeroProps> = ({ person }) => {
  const backdrop = person.knownForMovies.find(({ backdrop }) => backdrop)?.backdrop

  return (
    <Box component="section" aria-label="О человеке" sx={styles.root}>
      {backdrop && (
        <Box aria-hidden sx={[styles.backdrop, { backgroundImage: `url(${backdrop})` }]} />
      )}
      <Box aria-hidden sx={styles.shade} />
      <Box aria-hidden sx={styles.filmStrip} />

      <Box sx={styles.photoFrame}>
        {person.photo ? (
          <Box component="img" src={person.photo} alt={person.name} sx={styles.photo} />
        ) : (
          <PersonIcon sx={{ fontSize: 80, color: 'grey.500' }} />
        )}
      </Box>

      <Box sx={styles.body}>
        {person.knownFor && (
          <Typography variant="subtitle2" component="p" sx={styles.overline}>
            {person.knownFor}
          </Typography>
        )}
        <Typography variant="h2" component="h1" sx={styles.name}>
          {person.name}
        </Typography>
        {person.originalName && (
          <Typography variant="body1" sx={styles.originalName}>
            {person.originalName}
          </Typography>
        )}

        <Box component="dl" sx={styles.facts}>
          {getFacts(person).map(
            ({ label, value }) =>
              value && (
                <div key={label}>
                  <Typography component="dt" variant="subtitle1" sx={styles.factLabel}>
                    {label}
                  </Typography>
                  <Typography component="dd" variant="body2" sx={styles.factValue}>
                    {value}
                  </Typography>
                </div>
              )
          )}
        </Box>

        <PersonBiography text={person.biography} />
      </Box>
    </Box>
  )
}
