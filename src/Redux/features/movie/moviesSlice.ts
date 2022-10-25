import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import type { TMovie, TMovieStore } from './types'

const initialState: TMovieStore = {
  userInputMovie: '',
  moviesData: null,
  loadingMoviesData: false,
  errorMoviesData: '',
  year: '',
  currentPage: 1,
  pages: null,
  ratings: null,
  generes: ['none'],
}

const url = process.env.BASE_URL as string
const apiKey = process.env.API_KEY as string

export const getMovies = createAsyncThunk('getMovie', async () => {
  const response = await axios.get(url, {
    params: { s: 'Batman', apiKey: apiKey, page: 1, y: '' },
  })
  const data: Array<TMovie> = response.data

  return { data }
})

export const moviesSlice = createSlice({
  name: 'MoviesData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      return { ...state, loadingMoviesData: true }
    })
    builder.addCase(getMovies.fulfilled, (state, action) => {
      return {
        ...state,
        loadingMoviesData: false,
        moviesData: action.payload.data,
        errorMoviesData: '',
      }
    })
    builder.addCase(getMovies.rejected, (state, action) => {
      return {
        ...state,
        loadingMoviesData: false,
        moviesData: null,
        errorMoviesData: action.error.message,
      }
    })
  },
})
