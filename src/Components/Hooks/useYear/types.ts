export type TUseYear = {
  yearParams: string
  handleYearChange: (year: string) => void
  deleteYear: () => void
}

export enum YearQuery {
  year = 'year',
}
