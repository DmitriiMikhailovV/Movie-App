export type TMovieSearch = {
  onChangeMovie: React.ChangeEventHandler<HTMLInputElement>
  onClick: React.MouseEventHandler<HTMLButtonElement>
  searchedMovie: string
  value: string
  onChangeYear: React.ChangeEventHandler<HTMLInputElement> | undefined
  searchedYear: string
  pages: number
  isResponse: string
  loading: boolean
}
