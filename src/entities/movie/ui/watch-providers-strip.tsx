import { Box, Skeleton, SxProps, Theme, Tooltip, Typography } from '@mui/material'
import { FC, PointerEvent, ReactNode, useEffect, useRef, useState } from 'react'

import { visuallyHidden } from '@/shared/lib'

import { getCompactWatchProviderGroups } from '../lib'
import type { IWatchProviders } from '../model'

import { WatchProviderLogo } from './watch-provider-logo'

const LOGO_SIZE = 28
/** Больше логотипов в группе не помещается в узкую карточку; остальные — в «+N». */
const MAX_LOGOS_PER_GROUP = 4
const HINT_DURATION = 3000

const styles = {
  // Высота одна (28 px) в каждом состоянии — загрузка, логотипы, «нет данных», ошибка, — чтобы
  // карточки не росли по мере ответов. Исключение: на узкой карточке группы переносятся на вторую строку.
  root: { display: 'flex', alignItems: 'center', minHeight: LOGO_SIZE },
  groups: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: 2,
    rowGap: 1,
    m: 0
  },
  group: { display: 'flex', alignItems: 'center', gap: 1 },
  muted: { opacity: 0.8 },
  label: { opacity: 0.8, whiteSpace: 'nowrap' },
  logos: { display: 'flex', gap: 0.75, listStyle: 'none', m: 0, p: 0 },
  logo: { display: 'flex' },
  more: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: LOGO_SIZE,
    height: LOGO_SIZE,
    px: 0.5,
    boxSizing: 'border-box',
    borderRadius: '6px',
    border: '1px dashed',
    borderColor: 'outline.strong',
    fontSize: '12px',
    fontWeight: 500,
    fontVariantNumeric: 'tabular-nums'
  }
} satisfies Record<string, SxProps<Theme>>

interface IProviderHintProps {
  title: string
  sx: SxProps<Theme>
  children: ReactNode
}

/**
 * Пункт списка с подсказкой-названием. Мышью — наведением. Пальцем — нажатием, и на 3 с: стандартная
 * подсказка MUI открывается от касания, то есть всплывала бы при каждой прокрутке, начатой с логотипа.
 * При прокрутке браузер шлёт `pointercancel`, а не `pointerup`, поэтому она подсказку не откроет.
 */
const ProviderHint: FC<IProviderHintProps> = ({ title, sx, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const handlePointerUp = (event: PointerEvent) => {
    if (event.pointerType === 'mouse') return

    setIsOpen(true)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setIsOpen(false), HINT_DURATION)
  }

  return (
    <Tooltip
      title={title}
      describeChild
      disableTouchListener
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <Box component="li" sx={sx} onPointerUp={handlePointerUp}>
        {children}
      </Box>
    </Tooltip>
  )
}

interface IWatchProvidersStripProps {
  /** `undefined` — данные ещё не пришли. */
  providers?: IWatchProviders
  isError?: boolean
  /** Запрос ждёт сети (`isPaused` React Query): без этого скелетон висел бы бесконечно. */
  isOffline?: boolean
}

/**
 * Компактная строка «где смотреть» для карточки списка: подпись группы и логотипы сервисов.
 * Подробный блок со всеми вариантами — `WatchProvidersSection` на странице фильма.
 */
export const WatchProvidersStrip: FC<IWatchProvidersStripProps> = ({
  providers,
  isError,
  isOffline
}) => {
  const renderBody = (): ReactNode => {
    if (!providers) {
      if (isError || isOffline) {
        return (
          <Typography variant="caption" sx={styles.muted}>
            {isError ? 'Не удалось узнать, где смотреть' : 'Нет соединения'}
          </Typography>
        )
      }

      return <Skeleton variant="rounded" width={150} height={LOGO_SIZE} />
    }

    const groups = getCompactWatchProviderGroups(providers)

    if (groups.length === 0) {
      return (
        <Typography variant="caption" sx={styles.muted}>
          Нет данных о площадках
        </Typography>
      )
    }

    return (
      <Box component="dl" sx={styles.groups}>
        {groups.map(({ key, title, providers: list }) => {
          const visible = list.slice(0, MAX_LOGOS_PER_GROUP)
          const hidden = list.slice(MAX_LOGOS_PER_GROUP)
          const hiddenNames = hidden.map((provider) => provider.provider_name).join(', ')

          return (
            <Box key={key} sx={styles.group}>
              <Typography component="dt" variant="caption" sx={styles.label}>
                {title}
              </Typography>
              <Box component="dd" sx={{ m: 0 }}>
                <Box component="ul" sx={styles.logos}>
                  {visible.map((provider) => (
                    <ProviderHint
                      key={provider.provider_id}
                      title={provider.provider_name}
                      sx={styles.logo}
                    >
                      <WatchProviderLogo
                        provider={provider}
                        size={LOGO_SIZE}
                        alt={provider.provider_name}
                      />
                    </ProviderHint>
                  ))}
                  {hidden.length > 0 && (
                    <ProviderHint title={hiddenNames} sx={styles.more}>
                      <span aria-hidden>+{hidden.length}</span>
                      <Box component="span" sx={visuallyHidden}>
                        и ещё: {hiddenNames}
                      </Box>
                    </ProviderHint>
                  )}
                </Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    )
  }

  return (
    <Box role="group" aria-label="Где смотреть" sx={styles.root}>
      {renderBody()}
    </Box>
  )
}
