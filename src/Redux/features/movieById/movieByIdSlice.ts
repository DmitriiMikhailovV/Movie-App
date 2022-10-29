import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import type { TMovieById, TMovieByIdStore, TSearchMovieById } from './types'

const initialState: TMovieByIdStore = {
  movie: null,
  apiResponse: null,
  apiError: null,
  loadingMovie: false,
  errorMovie: '',
}

const url = process.env.REACT_APP_BASE_URL as string
const apiKey = process.env.REACT_APP_API_KEY as string

export const searchMovieById = createAsyncThunk<
  TSearchMovieById,
  { imdbID: string | undefined }
>('searchMovieById', async ({ imdbID }) => {
  const response = await axios.get(url, {
    params: {
      apiKey: apiKey,
      i: imdbID,
    },
  })

  const data: Array<TMovieById> =
    response.data.Response === 'False' ? null : response.data
  const apiResponse: string = response.data.Response
  const apiError: string = response.data.Error

  return { data, apiResponse, apiError }
})

export const movieByIdSlice = createSlice({
  name: 'movieById',
  initialState,
  reducers: {
    // addRatingOfMovie: (state, action): TMovieStore => {
    //   if (
    //     state.ratedMovies.find(({ imdbID }) => imdbID === action.payload.imdbID)
    //   ) {
    //     return {
    //       ...state,
    //       ratedMovies: state.ratedMovies.map((movie) =>
    //         movie.imdbID === action.payload.imdbID ? action.payload : movie
    //       ),
    //     }
    //   } else {
    //     return {
    //       ...state,
    //       ratedMovies: [...state.ratedMovies, action.payload],
    //     }
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(searchMovieById.pending, (state) => {
      return { ...state, loadingMovie: true }
    })
    builder.addCase(searchMovieById.fulfilled, (state, action) => {
      return {
        ...state,
        loadingMovie: false,
        movie: action.payload.data,
        apiResponse: action.payload.apiResponse,
        apiError: action.payload.apiError,
        errorMovie: '',
      }
    })
    builder.addCase(searchMovieById.rejected, (state, action) => {
      return {
        ...state,
        loadingMovie: false,
        movie: null,
        errorMovie: action.error.message,
      }
    })
  },
})

// export const { addRatingOfMovie } = moviesSlice.actions
