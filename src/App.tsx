import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Search } from './Components/Pages'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
const theme = createTheme()

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:imdbID" element={<></>} />
        <Route path="/ratings" element={<></>} />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </ThemeProvider>
  )
}
