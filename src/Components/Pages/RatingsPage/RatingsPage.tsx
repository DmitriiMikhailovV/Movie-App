import { FC, useState } from 'react'
import {
  Box,
  CircularProgress,
  Container,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { RatedMovieCard } from 'src/Components/generic'
import { useAppSelector } from 'src/Redux/store'
import { useGetFullDetailRatedMovies } from 'src/Components/Hooks'
import { useGetGenres } from 'src/Components/Hooks/useGetGenres/useGetGenres'

export const RatingsPage: FC = () => {
  const { ratedMovies } = useAppSelector((state) => state.moviesData)
  const { movies, loading, error } = useGetFullDetailRatedMovies(ratedMovies)
  const { genres } = useGetGenres(movies)
  const [genreFilter, setGenreFilter] = useState<string>('')

  error && console.log(error)

  return (
    <Box>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 3,
        }}
        maxWidth="lg"
      >
        {loading ? (
          <CircularProgress />
        ) : movies?.length === 0 ? (
          <Typography variant="h5">No Rated movies</Typography>
        ) : (
          <>
            <Typography variant="subtitle1">Filter by genre</Typography>
            <Select
              sx={{ marginBottom: '16px', width: '100%' }}
              value={genreFilter}
              defaultValue={''}
              displayEmpty
              onChange={(e) => setGenreFilter(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
            <>
              {genreFilter.length === 0
                ? movies?.map(
                    ({ imdbID, Poster, Title, Year, Type, Genre, rating }) => (
                      <RatedMovieCard
                        key={imdbID}
                        imdbID={imdbID}
                        Poster={Poster}
                        Title={Title}
                        Year={Year}
                        Type={Type}
                        Genre={Genre}
                        rating={rating}
                      />
                    )
                  )
                : movies
                    ?.filter((movie) => movie.Genre.includes(genreFilter))
                    .map(
                      ({
                        imdbID,
                        Poster,
                        Title,
                        Year,
                        Type,
                        Genre,
                        rating,
                      }) => (
                        <RatedMovieCard
                          key={imdbID}
                          imdbID={imdbID}
                          Poster={Poster}
                          Title={Title}
                          Year={Year}
                          Type={Type}
                          Genre={Genre}
                          rating={rating}
                        />
                      )
                    )}
            </>
          </>
        )}
      </Container>
    </Box>
  )
}
