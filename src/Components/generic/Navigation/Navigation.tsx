import { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { TNavigation } from './types'

export const Navigation: FC<TNavigation> = ({
  pages,
  anchorElNav,
  setAnchorElNav,
}) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={(e) => setAnchorElNav(e.currentTarget)}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={() => setAnchorElNav(null)}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {pages.map(({ to, name }) => (
            <Link key={name} to={to} style={{ textDecoration: 'none' }}>
              <MenuItem onClick={() => setAnchorElNav(null)}>
                <Typography textAlign="center">{name}</Typography>
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map(({ to, name }) => (
          <Link key={name} to={to} style={{ textDecoration: 'none' }}>
            <Button
              onClick={() => setAnchorElNav(null)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {name}
            </Button>
          </Link>
        ))}
      </Box>
    </>
  )
}
