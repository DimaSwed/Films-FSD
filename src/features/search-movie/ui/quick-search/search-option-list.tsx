import { Box, SxProps } from '@mui/material'
import { useEffect, useRef } from 'react'

import { activeOptionStyles, movieItemStyles } from '../styles/search-movie-button.styles'

import { getSearchOptionId } from './search-option-id'

interface ISearchOption {
  key: string | number
  label: string
}

interface ISearchOptionListProps {
  id: string
  label: string
  options: readonly ISearchOption[]
  /** Индекс активной опции (фокус при этом остаётся в поле ввода) или -1. */
  activeIndex: number
  onSelect: (index: number) => void
  sx: SxProps
}

interface ISearchOptionProps {
  id: string
  label: string
  active: boolean
  onSelect: () => void
}

const SearchOption = ({ id, label, active, onSelect }: ISearchOptionProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (active) ref.current?.scrollIntoView({ block: 'nearest' })
  }, [active])

  return (
    <Box
      ref={ref}
      id={id}
      role="option"
      aria-selected={active}
      sx={{ ...movieItemStyles, ...(active ? activeOptionStyles : {}) }}
      // Клик по опции не должен уводить фокус из поля ввода.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onSelect}
    >
      {label}
    </Box>
  )
}

/** Список подсказок быстрого поиска (результаты или история) — единая разметка для обоих. */
export const SearchOptionList = ({
  id,
  label,
  options,
  activeIndex,
  onSelect,
  sx
}: ISearchOptionListProps) => (
  // tabIndex -1: без него браузер делает прокручиваемый список отдельной остановкой Tab.
  <Box role="listbox" id={id} aria-label={label} tabIndex={-1} sx={sx}>
    {options.map((option, index) => (
      <SearchOption
        key={option.key}
        id={getSearchOptionId(id, index)}
        label={option.label}
        active={index === activeIndex}
        onSelect={() => onSelect(index)}
      />
    ))}
  </Box>
)
