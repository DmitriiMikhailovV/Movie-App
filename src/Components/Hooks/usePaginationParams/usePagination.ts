import { useSearchParams } from 'react-router-dom'

import { PageQuery, TUsePagination } from '../usePagination/types'

export const usePagination = (): TUsePagination => {
  const [searchParams, setSearchParams] = useSearchParams()

  const _defaultPageState = {
    page: 1,
  }

  const queryPage = searchParams.get(PageQuery.page)
  const pageParams =
    queryPage !== null ? Number(queryPage) : _defaultPageState.page

  const pageChangeParams = (newPage: number): void => {
    searchParams.set(PageQuery.page, String(newPage))
    setSearchParams(searchParams)
  }

  return {
    pageParams,
    pageChangeParams,
  }
}
