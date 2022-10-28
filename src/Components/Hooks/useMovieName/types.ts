export type TUseMovieName = {
  movieNameParams: string
  handleMovieNameChange: (movieName: string) => void
}

export enum MovieNameQuery {
  movieName = 'movieName',
}
