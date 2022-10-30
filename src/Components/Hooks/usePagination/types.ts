export type TUsePagination = {
  pageParams: number
  pageChangeParams: (page: number) => void
}

export enum PageQuery {
  page = 'page',
}
