import { FC, useState } from 'react'
import { AppBar, Container, Toolbar } from '@mui/material'
import { Navigation } from 'src/Components/generic'
import { useMockPages } from './useMockPages'

export const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const { pages } = useMockPages()

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Navigation
            pages={pages}
            anchorElNav={anchorElNav}
            setAnchorElNav={setAnchorElNav}
          />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
