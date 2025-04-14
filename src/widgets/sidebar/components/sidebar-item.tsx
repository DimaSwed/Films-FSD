import { FC, useState } from 'react'
import {
  ListItemButton,
  ListItemText,
  Collapse,
  List,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { ISidebarItemProps } from '@/widgets/sidebar/types/sidebar.types'

export const SidebarItem: FC<ISidebarItemProps> = ({ primary, children }) => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      {isMdUp && (
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={primary} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      )}
      <Collapse in={open || !isMdUp} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  )
}
