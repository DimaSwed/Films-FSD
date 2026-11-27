import { Box, Stack } from '@mui/material'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'

import { SmallMovieCard } from '@/entities/movie'
import { PersonFilmography, PersonHero, usePerson } from '@/entities/person'
import { parseTmdbId } from '@/shared/api'
import { LoadingErrorState, PageMeta, PageShell, ScrollRow } from '@/shared/ui'

import { PersonNotFound } from './person-not-found'

export const PersonPage = () => {
  const { id } = useParams<{ id: string }>()
  const personId = parseTmdbId(id)
  const { data: person, isError, isPaused, refetch } = usePerson(personId)

  if (personId === undefined || person === null) return <PersonNotFound />

  if (!person) {
    // Без сети запрос ждёт (не ошибка) и продолжится сам, поэтому кнопки повтора нет
    const errorTitle = isPaused ? 'Нет соединения' : 'Ошибка загрузки'
    const isFailed = isError || isPaused

    return (
      <PageShell centered>
        {isFailed && <PageMeta title={errorTitle} noIndex />}
        <LoadingErrorState
          isLoading={!isFailed}
          isError={isFailed}
          loadingText="Загружаем фильмографию..."
          errorTitle={errorTitle}
          errorDescription={
            isPaused
              ? 'Загрузим страницу, как только появится интернет.'
              : 'Не удалось загрузить страницу. Попробуйте ещё раз.'
          }
          retry={isPaused ? undefined : refetch}
        />
      </PageShell>
    )
  }

  return (
    <PageShell>
      <PageMeta
        title={person.name}
        description={
          person.biography ||
          [person.knownFor, person.name, 'фильмография на КиноТрекере'].filter(Boolean).join(' — ')
        }
        image={person.photo || undefined}
        type="profile"
      />
      {/* key: переход к другому человеку возвращает вкладки и ряды в начало */}
      <Fragment key={person.id}>
        <PersonHero person={person} />

        <Stack sx={{ gap: 4, padding: { xs: '15px', md: '30px' } }}>
          {person.knownForMovies.length > 0 && (
            <ScrollRow title="Известность">
              {person.knownForMovies.map((movie) => (
                <Box component="li" key={movie.id} sx={{ width: { xs: 140, sm: 160 } }}>
                  <SmallMovieCard movie={movie} />
                </Box>
              ))}
            </ScrollRow>
          )}
          <PersonFilmography groups={person.filmography} />
        </Stack>
      </Fragment>
    </PageShell>
  )
}
