import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux'
import { movieByIdSlice, moviesSlice } from './features'

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
