import { Tab, Tabs } from '@mui/material'
import { FC } from 'react'

import type { TMovieCategory } from '@/features/movies'

import { getTrailersTabId, TRAILERS_PANEL_ID, TRAILERS_TABS } from '../config'

interface ITrailersTabsProps {
  category: TMovieCategory
  onChange: (category: TMovieCategory) => void
}

export const TrailersTabs: FC<ITrailersTabsProps> = ({ category, onChange }) => (
  <Tabs
    value={category}
    onChange={(_event, value: TMovieCategory) => onChange(value)}
    variant="scrollable"
    scrollButtons={false}
    textColor="inherit"
    aria-label="Подборка трейлеров"
    // primary в тёмной теме сливается с фоном
    sx={{ mb: 3, '& .MuiTabs-indicator': { bgcolor: 'text.primary' } }}
  >
    {TRAILERS_TABS.map((tab) => (
      <Tab
        key={tab.category}
        id={getTrailersTabId(tab.category)}
        aria-controls={TRAILERS_PANEL_ID}
        value={tab.category}
        label={tab.label}
        sx={{ textTransform: 'none' }}
      />
    ))}
  </Tabs>
)
