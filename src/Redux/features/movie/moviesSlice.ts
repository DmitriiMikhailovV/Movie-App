import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import type { TMovie, TMovieStore, TSearchMovie } from './types'

const initialState: TMovieStore = {
  moviesData: null,
  totalResults: '',
  apiResponse: null,
  apiError: null,
  loadingMoviesData: false,
  errorMoviesData: '',
}

const url = process.env.REACT_APP_BASE_URL as string
const apiKey = process.env.REACT_APP_API_KEY as string

export const searchMovies = createAsyncThunk<
  TSearchMovie,
  { page: number; movieName: string; movieYear: string }
>('searchMovie', async ({ page, movieName, movieYear }) => {
  const response = await axios.get(url, {
    params: { apiKey: apiKey, s: movieName, y: movieYear, page: page },
  })
  console.log(response)

  const data: Array<TMovie> = response.data.Search
  const totalResults: string = response.data.totalResults
  const apiResponse: string = response.data.Response
  const apiError: string = response.data.Error

  return { data, totalResults, apiResponse, apiError }
})

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
        apiResponse: action.payload.apiResponse,
        apiError: action.payload.apiError,
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
