import { TMovie } from 'src/Redux/features/movies/types'

export type TRatedMovieCard = TMovie & {
  rating: number
}
