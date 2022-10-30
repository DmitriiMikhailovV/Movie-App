export type TUseYear = {
  yearParams: string
  yearChangeParams: (year: string) => void
  deleteYearParams: () => void
}

export enum YearQuery {
  year = 'year',
}
