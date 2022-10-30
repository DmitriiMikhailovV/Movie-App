export type TUseMovieName = {
  movieNameParams: string
  movieNameChangeParams: (movieName: string) => void
  deleteMovieNameParams: () => void
}

export enum MovieNameQuery {
  movieName = 'movieName',
}
