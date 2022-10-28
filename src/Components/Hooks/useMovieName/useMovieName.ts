import { useSearchParams } from 'react-router-dom'
import { PageQuery } from '../usePagination/types'

import { TUseMovieName, MovieNameQuery } from './types'

export const useMovieName = (): TUseMovieName => {
  const [searchParams, setSearchParams] = useSearchParams()

  const _defaultMovieNameState = {
    movieName: '',
  }

  const queryMovieName = searchParams.get(MovieNameQuery.movieName)
  const movieNameParams =
    queryMovieName !== null ? queryMovieName : _defaultMovieNameState.movieName

  const handleMovieNameChange = (newMovieName: string): void => {
    searchParams.set(MovieNameQuery.movieName, newMovieName)
    searchParams.set(PageQuery.page, String(1))
    searchParams.delete('year')
    setSearchParams(searchParams)
    console.log(
      'paramsMovieNameChange',
      searchParams.get('movieName'),
      searchParams.get('year'),
      searchParams.get('page')
    )
  }

  return {
    movieNameParams,
    handleMovieNameChange,
  }
}
