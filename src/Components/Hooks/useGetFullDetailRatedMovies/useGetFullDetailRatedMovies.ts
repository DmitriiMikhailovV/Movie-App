import axios from 'axios'
import { useState, useEffect } from 'react'
import type { TRatedMovie } from 'src/Redux/features/movies/types'
import type { TMovieFullDetail } from '../useGetMovieById/types'
import { TFullDetailRatedMovie } from './types'

const url = process.env.REACT_APP_BASE_URL as string
const apiKey = process.env.REACT_APP_API_KEY as string

export const useGetFullDetailRatedMovies = (
  ratedMovies: Array<TRatedMovie>
) => {
  const [movies, setMovies] = useState<Array<TFullDetailRatedMovie> | null>(
    null
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null | unknown>(null)

  const fetchFullDetailMovies = async () => {
    setLoading(true)
    try {
      let movieArraywithFullDetails: Array<
        TMovieFullDetail & { rating: number | null }
      > = []
      await Promise.all(
        ratedMovies.map(async function (movie) {
          let response = await axios.get(url, {
            params: { apiKey: apiKey, i: movie.imdbID },
          })
          const movieFullDetailsWithRating = {
            ...response.data,
            rating: movie.rating,
          }

          movieArraywithFullDetails = [
            ...movieArraywithFullDetails,
            movieFullDetailsWithRating,
          ]
        })
      )
      setMovies(movieArraywithFullDetails)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchFullDetailMovies()
  }, [])

  return { movies, loading, error }
}
