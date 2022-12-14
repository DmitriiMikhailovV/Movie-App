import { useSearchParams } from 'react-router-dom'
import { PageQuery } from '../usePagination/types'
import { YearQuery } from '../useYear/types'

import { TUseMovieName, MovieNameQuery } from './types'

export const useMovieName = (): TUseMovieName => {
  const [searchParams, setSearchParams] = useSearchParams()

  const _defaultMovieNameState = {
    movieName: '',
  }

  const queryMovieName = searchParams.get(MovieNameQuery.movieName)
  const movieNameParams =
    queryMovieName !== null ? queryMovieName : _defaultMovieNameState.movieName

  const movieNameChangeParams = (newMovieName: string): void => {
    searchParams.set(MovieNameQuery.movieName, newMovieName)
    searchParams.set(PageQuery.page, String(1))
    searchParams.delete(YearQuery.year)
    setSearchParams(searchParams)
  }

  const deleteMovieNameParams = () => {
    searchParams.delete(MovieNameQuery.movieName)
    searchParams.delete(YearQuery.year)
    setSearchParams(searchParams)
  }

  return {
    movieNameParams,
    movieNameChangeParams,
    deleteMovieNameParams,
  }
}
