export type TUsePagination = {
  pageParams: number
  handlePageChange: (page: number) => void
}

export enum PageQuery {
  page = 'page',
}
