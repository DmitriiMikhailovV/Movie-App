import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux'
import { movieByIdSlice } from './features/movieById/movieByIdSlice'
import { moviesSlice } from './features/movies/moviesSlice'

export const store = configureStore({
  reducer: {
    moviesData: moviesSlice.reducer,
    movieById: movieByIdSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ immutableCheck: true })
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
