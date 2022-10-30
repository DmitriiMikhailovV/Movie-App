import axios from 'axios'
import { useState, useEffect } from 'react'
import { TMovieFullDetail } from './types'

const url = process.env.REACT_APP_BASE_URL as string
const apiKey = process.env.REACT_APP_API_KEY as string

export const useGetMovieById = (imdbID: string | undefined) => {
  const [movie, setMovie] = useState<TMovieFullDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [error, setError] = useState<string | null | unknown>(null)

  const fetchMovie = async () => {
    setLoading(true)
    try {
      const response = await axios.get(url, {
        params: {
          apiKey: apiKey,
          i: imdbID,
        },
      })
      response.data.Response === 'False'
        ? setApiError(response.data.Error)
        : setMovie(response.data)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMovie()
  }, [])

  return { movie, loading, apiError, error }
}
