import { FC, ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  CircularProgress,
  IconButton,
} from '@mui/material'
import { Clear } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { SearchedMovieCard, Pagination } from 'src/Components/generic'
import {
  addRatingOfMovie,
  resetTotalResults,
  searchMovies,
} from 'src/Redux/features/movies/moviesSlice'
import { AppDispatch, useAppSelector } from 'src/Redux/store'
import { useMovieName, usePagination, useYear } from 'src/Components/Hooks'

import type { TRatedMovie } from 'src/Redux/features/movies/types'

export const SearchPage: FC = () => {
  const { movieNameParams, movieNameChangeParams, deleteMovieNameParams } =
    useMovieName()
  const { pageParams, pageChangeParams } = usePagination()
  const { yearParams, yearChangeParams, deleteYearParams } = useYear()
  const [page, setPage] = useState<number>(pageParams)
  const [movieName, setMovieName] = useState<string>(movieNameParams)
  const [movieYear, setMovieYear] = useState<string>(yearParams)
  const { ratedMovies } = useAppSelector((state) => state.moviesData)
  const navigate = useNavigate()
  const {
    moviesData,
    totalResults,
    apiResponse,
    apiError,
    errorMoviesData,
    loadingMoviesData,
  } = useAppSelector((state) => state.moviesData)
  const dispatch = useDispatch<AppDispatch>()

  const onChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    if (page !== newPage) {
      setPage(newPage)
      dispatch(searchMovies({ page: newPage, movieName, movieYear }))
      pageChangeParams(newPage)
    }
  }

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPage(1)
    movieNameChangeParams(movieName)
    movieYear.length > 0 && yearChangeParams(movieYear)
    dispatch(searchMovies({ page: 1, movieName, movieYear }))
  }

  const onClearMovieName = () => {
    setMovieName('')
    deleteMovieNameParams()
    setMovieYear('')
    dispatch(resetTotalResults())
  }

  const onClearYear = () => {
    setMovieYear('')
    deleteYearParams()
  }

  const onChangeRating = (
    rating: TRatedMovie | undefined,
    newValue: number | null,
    imdbID: string
  ) => {
    dispatch(
      addRatingOfMovie({
        ...rating,
        rating: newValue,
        imdbID: imdbID,
      })
    )
  }

  const navigateToMovieDetail = (imdbID: string) => {
    navigate(`/movie/${imdbID}`)
  }

  errorMoviesData && console.log(errorMoviesData)

  return (
    <>
      <Box>
        <Container sx={{ py: 3 }} maxWidth="lg">
          <form onSubmit={(e) => onSearch(e)}>
            <Grid
              container
              sx={{
                flexDirection: 'column',
                alignContent: 'center',
                marginBottom: '16px',
              }}
            >
              <TextField
                sx={{ width: 300, maxWidth: '100%', marginY: '8px' }}
                label="Movie name..."
                variant="standard"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      disabled={movieName.length === 0}
                      onClick={onClearMovieName}
                    >
                      <Clear />
                    </IconButton>
                  ),
                }}
              />
              <TextField
                sx={{ width: 300, maxWidth: '100%', marginY: '8px' }}
                label="Year..."
                variant="standard"
                value={movieYear}
                onChange={(e) => setMovieYear(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      disabled={movieYear.length === 0}
                      onClick={onClearYear}
                    >
                      <Clear />
                    </IconButton>
                  ),
                }}
              />
              <Button
                sx={{ marginY: '8px' }}
                variant="contained"
                type="submit"
                disabled={movieName.length === 0}
              >
                Search
              </Button>
            </Grid>
          </form>
          {totalResults && (
            <Grid
              container
              sx={{ marginTop: '16px', justifyContent: 'center' }}
            >
              {movieName.length !== 0 && (
                <Pagination
                  total={totalResults}
                  page={page}
                  onChange={onChangePage}
                  size="large"
                />
              )}
            </Grid>
          )}
          <Grid container sx={{ justifyContent: 'space-around' }}>
            {loadingMoviesData ? (
              <CircularProgress />
            ) : apiResponse === 'False' ? (
              apiError
            ) : (
              moviesData?.map(({ imdbID, Poster, Title, Year }) => (
                <SearchedMovieCard
                  key={imdbID}
                  imdbID={imdbID}
                  Poster={Poster}
                  Title={Title}
                  Year={Year}
                  rating={ratedMovies.find((movie) => movie.imdbID === imdbID)}
                  onChange={onChangeRating}
                  navigate={navigateToMovieDetail}
                />
              ))
            )}
          </Grid>
        </Container>
      </Box>
    </>
  )
}
