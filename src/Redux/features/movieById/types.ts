export type TMovieByIdStore = {
  movie: TMovieById | null
  loadingMovie: boolean
  errorMovie: string | undefined
  apiResponse: string | null
  apiError: string | null
}
export type TMovieById = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Array<{ Source: string; Value: string }>
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
  rating?: number
}

export type TSearchMovieById = {
  data: any
  apiResponse: string | null
  apiError: string | null
}
