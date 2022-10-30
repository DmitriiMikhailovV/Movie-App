import { useEffect, useState } from 'react'
import { TFullDetailRatedMovie } from '../useGetFullDetailRatedMovies/types'

export const useGetGenres = (movies: TFullDetailRatedMovie[] | null) => {
  const [genres, setGenres] = useState<Array<string>>([])

  const getGenres = () => {
    let tempArr: Array<string> = []
    movies?.map(({ Genre }) => {
      const genreToArray = Genre.split(', ')
      tempArr = [...tempArr, ...genreToArray].sort()
    })
    setGenres([...new Set([...tempArr])])
  }

  useEffect(() => {
    getGenres()
  }, [movies])

  return {
    genres,
  }
}
