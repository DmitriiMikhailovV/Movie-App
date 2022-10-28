import { ChangeEvent, FC, useState } from 'react'
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
import { MovieCard, Pagination } from 'src/Components/generic'
import { searchMovies } from 'src/Redux/features/movie/moviesSlice'
import { AppDispatch, useAppSelector } from 'src/Redux/store'
import { useMovieName, usePagination, useYear } from 'src/Components/Hooks'
import { Clear } from '@mui/icons-material'

export const SearchPage: FC = () => {
  const { movieNameParams, handleMovieNameChange, deleteMovieName } =
    useMovieName()
  const { pageParams, handlePageChange } = usePagination()
  const { yearParams, handleYearChange, deleteYear } = useYear()
  const [page, setPage] = useState<number>(pageParams)
  const [movieName, setMovieName] = useState<string>(movieNameParams)
  const [movieYear, setMovieYear] = useState<string>(yearParams)
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
    setPage(newPage)
    dispatch(searchMovies({ page: newPage, movieName, movieYear }))
    handlePageChange(newPage)
  }

  const onSearch = () => {
    setPage(1)
    handleMovieNameChange(movieName)
    movieYear.length > 0 && handleYearChange(movieYear)
    dispatch(searchMovies({ page: 1, movieName, movieYear }))
  }

  const onClearMovieName = () => {
    setMovieName('')
    deleteMovieName()
  }

  const onClearYear = () => {
    setMovieYear('')
    deleteYear()
  }

  errorMoviesData && console.log(errorMoviesData)

  return (
    <>
      <Box>
        <Container sx={{ py: 3 }} maxWidth="lg">
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
                  <IconButton disabled={movieName.length == 0}>
                    <Clear onClick={onClearMovieName} />
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
                  <IconButton disabled={movieYear.length == 0}>
                    <Clear onClick={onClearYear} />
                  </IconButton>
                ),
              }}
            />
            <Button
              sx={{ marginY: '8px' }}
              variant="contained"
              onClick={onSearch}
            >
              Search
            </Button>
          </Grid>
          {totalResults && (
            <Grid
              container
              sx={{ marginTop: '16px', justifyContent: 'center' }}
            >
              <Pagination
                total={totalResults}
                page={page}
                onChange={onChangePage}
                size="large"
              />
            </Grid>
          )}
          <Grid container sx={{ justifyContent: 'space-around' }}>
            {loadingMoviesData ? (
              <CircularProgress />
            ) : apiResponse === 'False' ? (
              apiError
            ) : (
              moviesData?.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))
            )}
          </Grid>
        </Container>
      </Box>
    </>
  )
}
