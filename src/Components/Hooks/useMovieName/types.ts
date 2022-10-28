export type TUseMovieName = {
  movieNameParams: string
  handleMovieNameChange: (movieName: string) => void
  deleteMovieName: () => void
}

export enum MovieNameQuery {
  movieName = 'movieName',
}
