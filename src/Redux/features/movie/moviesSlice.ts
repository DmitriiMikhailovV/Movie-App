import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import type { TMovie, TMovieStore, TSearchMovie } from './types'

const initialState: TMovieStore = {
  userInputMovie: '',
  moviesData: null,
  totalResults: '',
  loadingMoviesData: false,
  errorMoviesData: '',
  year: '',
  currentPage: 1,
  pages: null,
  ratings: null,
  genres: ['none'],
}

const url = process.env.REACT_APP_BASE_URL as string
const apiKey = process.env.REACT_APP_API_KEY as string

export const searchMovies = createAsyncThunk<TSearchMovie, { page: number }>(
  'searchMovie',
  async ({ page }) => {
    const response = await axios.get(url, {
      params: { apiKey: apiKey, s: 'Batman', y: '', page: page },
    })
    const data: Array<TMovie> = response.data.Search
    const totalResults: string = response.data.totalResults

    return { data, totalResults }
  }
)

export const moviesSlice = createSlice({
  name: 'moviesData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchMovies.pending, (state) => {
      return { ...state, loadingMoviesData: true }
    })
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      return {
        ...state,
        loadingMoviesData: false,
        moviesData: action.payload.data,
        totalResults: action.payload.totalResults,
        errorMoviesData: '',
      }
    })
    builder.addCase(searchMovies.rejected, (state, action) => {
      return {
        ...state,
        loadingMoviesData: false,
        moviesData: null,
        errorMoviesData: action.error.message,
      }
    })
  },
})
