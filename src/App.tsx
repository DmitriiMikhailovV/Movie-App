import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './GlobalStyles'
import { colors } from './theme'

export const App: FC = () => {
  return (
    <ThemeProvider theme={colors}>
      <GlobalStyles />
      <Routes>
        <Route path="/search" element={<></>} />
        <Route path="/movie/:imdbID" element={<></>} />
        <Route path="/ratings" element={<></>} />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </ThemeProvider>
  )
}
