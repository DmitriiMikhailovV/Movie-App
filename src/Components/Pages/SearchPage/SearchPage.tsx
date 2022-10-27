import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'
import { MovieCard, Pagination } from 'src/Components/generic'
import { searchMovies } from 'src/Redux/features/movie/moviesSlice'
import { AppDispatch, useAppSelector } from 'src/Redux/store'

export const SearchPage: FC = () => {
  const [page, setPage] = useState<number>(1)
  const [movieName, setMovieName] = useState<string>('')
  const [movieYear, setMovieYear] = useState<string>('')
  const {
    moviesData,
    totalResults,
    apiResponse,
    apiError,
    errorMoviesData,
    loadingMoviesData,
  } = useAppSelector((state) => state.moviesData)
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value)
    dispatch(searchMovies({ page, movieName, movieYear }))
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
            />
            <TextField
              sx={{ width: 300, maxWidth: '100%', marginY: '8px' }}
              label="Year..."
              variant="standard"
              value={movieYear}
              onChange={(e) => setMovieYear(e.target.value)}
            />
            <Button
              sx={{ marginY: '8px' }}
              variant="contained"
              onClick={() =>
                dispatch(searchMovies({ page, movieName, movieYear }))
              }
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
                onChange={handleChange}
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
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  // Title={Title}
                  // Year={Year}
                  // Poster={Poster}
                />
              ))
            )}
          </Grid>
        </Container>
      </Box>
    </>
  )
}
