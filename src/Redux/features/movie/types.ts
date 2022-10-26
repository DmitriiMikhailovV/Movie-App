export type TMovieStore = {
  moviesData: Array<TMovie> | null
  totalResults: string
  apiResponse: string | null
  apiError: string | null
  loadingMoviesData: Boolean
  errorMoviesData: string | undefined
}

export type TMovie = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export type Rating = {
  imdbID: string
  rating: Number
  genre: string
}

export type TSearchMovie = {
  data: Array<TMovie>
  totalResults: string
  apiResponse: string | null
  apiError: string | null
}
