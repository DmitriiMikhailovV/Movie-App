import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import { Header, SearchPage, RatingsPage, MoviePage } from './Components/Pages'

const theme = createTheme()

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:imdbID" element={<MoviePage />} />
        <Route path="/ratings" element={<RatingsPage />} />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </ThemeProvider>
  )
}
