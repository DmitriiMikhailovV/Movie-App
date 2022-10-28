import { TMovie } from 'src/Redux/features/movie/types'

export type TRatedMovieCard = TMovie & {
  rating: number
}
