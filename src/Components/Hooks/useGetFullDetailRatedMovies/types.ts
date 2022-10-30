import type { TMovieFullDetail } from '../useGetMovieById/types'

export type TFullDetailRatedMovie = TMovieFullDetail & {
  rating: number | null
}
