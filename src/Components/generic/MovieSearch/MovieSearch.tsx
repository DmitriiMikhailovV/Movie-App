import { FC } from 'react'
import { CircularProgress } from '@material-ui/core'
import { Input, Button } from '@mui/material'

import { SearchContainer, StyledForm, NotFound } from './styles'

import { TMovieSearch } from './types'

const MovieSearch: FC<TMovieSearch> = ({
  onChangeMovie,
  onClick,
  searchedMovie,
  onChangeYear,
  searchedYear,
  pages,
  isResponse,
  loading,
}) => {
  return (
    <SearchContainer pages={pages}>
      <StyledForm>
        <Input
          placeholder={'Search Movie...'}
          onChange={onChangeMovie}
          value={searchedMovie}
        />
        <Input
          placeholder={'Year...'}
          onChange={onChangeYear}
          value={searchedYear}
        />
        <Button type="submit" onClick={onClick}>
          Search
        </Button>
      </StyledForm>
      <NotFound isResponse={isResponse === 'False' && window.innerWidth < 768}>
        Sorry. Movie not found
      </NotFound>
      {loading && window.innerWidth <= 768 ? <CircularProgress /> : ''}
    </SearchContainer>
  )
}

export default MovieSearch
