import { TPages } from 'src/Components/Pages/Header/types'

export type TNavigation = {
  pages: Array<TPages>
  anchorElNav: HTMLElement | null
  setAnchorElNav: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}
