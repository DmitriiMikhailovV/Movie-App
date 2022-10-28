import { TPages } from './types'

export const useMockPages = (): {
  pages: Array<TPages>
} => {
  const pages: Array<TPages> = [
    {
      to: '/search',
      name: 'Search',
    },
    {
      to: '/ratings',
      name: 'Ratings',
    },
  ]

  return { pages }
}
