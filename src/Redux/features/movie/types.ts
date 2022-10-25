export type TMovieStore = {
  userInputMovie: string
  moviesData: Array<TMovie> | null
  totalResults: string
  loadingMoviesData: Boolean
  errorMoviesData: string | undefined
  year: string
  currentPage: number
  pages: number | null
  ratings: Array<Rating> | null
  genres: Array<string>
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
}
