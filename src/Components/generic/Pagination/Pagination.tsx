import { FC } from 'react'
import { Pagination as MuiPagination } from '@mui/material'
import type { TPagination } from './types'

export const Pagination: FC<TPagination> = ({ total, ...rest }) => {
  const totalPage: number = Math.ceil(Number(total) / 10)

  return (
    <>
      <MuiPagination count={totalPage} {...rest} />
    </>
  )
}
