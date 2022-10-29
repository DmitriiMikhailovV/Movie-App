export type TMovieStore = {
  moviesData: Array<TMovie> | null
  totalResults: string
  apiResponse: string | null
  apiError: string | null
  loadingMoviesData: Boolean
  errorMoviesData: string | undefined
  ratedMovies: Array<TRatedMovie>
}

export type TMovie = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  Genre: string
}

export type TRatedMovie = {
  imdbID: string
  rating: number
}

export type Rating = {
  imdbID: string
  rating: number
  genre: string
}

export type TSearchMovie = {
  data: Array<TMovie>
  totalResults: string
  apiResponse: string | null
  apiError: string | null
}
