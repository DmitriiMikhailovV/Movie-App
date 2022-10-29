import { TRatedMovie } from 'src/Redux/features/movies/types'

export type TMovieCard = {
  imdbID: string
  Poster: string
  Title: string
  Year: string
  rating: TRatedMovie | undefined
  onChange: (
    rating: TRatedMovie | undefined,
    newValue: number | null,
    imdbID: string
  ) => void
  navigate: (imdbID: string) => void
}
