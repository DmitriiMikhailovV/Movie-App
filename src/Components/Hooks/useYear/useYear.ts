import { useSearchParams } from 'react-router-dom'

import { TUseYear, YearQuery } from './types'

export const useYear = (): TUseYear => {
  const [searchParams, setSearchParams] = useSearchParams()

  const _defaultYearState = {
    year: '',
  }

  const queryYear = searchParams.get(YearQuery.year)
  const yearParams = queryYear !== null ? queryYear : _defaultYearState.year

  const yearChangeParams = (newYear: string): void => {
    searchParams.set(YearQuery.year, newYear)
    setSearchParams(searchParams)
  }

  const deleteYearParams = () => {
    searchParams.delete(YearQuery.year)
    setSearchParams(searchParams)
  }

  return {
    yearParams,
    yearChangeParams,
    deleteYearParams,
  }
}
