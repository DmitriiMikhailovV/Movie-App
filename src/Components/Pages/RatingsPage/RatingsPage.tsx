import { FC, useEffect, useState } from 'react'
import { Box, Container, MenuItem, Select, Typography } from '@mui/material'
import { RatedMovieCard } from 'src/Components/generic'
import { useAppSelector } from 'src/Redux/store'
import axios from 'axios'
import { TMovieFullDetail } from 'src/Components/Hooks/useFetchMovieById/types'

export const RatingsPage: FC = () => {
  const { ratedMovies } = useAppSelector((state) => state.moviesData)
  const [movies, setMovies] = useState<Array<
    TMovieFullDetail & { rating: number | null }
  > | null>(null)
  const [genres, setGenres] = useState<Array<string>>([])
  const [genreFilter, setGenreFilter] = useState<string>('')

  const url = process.env.REACT_APP_BASE_URL as string
  const apiKey = process.env.REACT_APP_API_KEY as string

  const getFullDetail = async () => {
    let movieArraywithFullDetails: Array<
      TMovieFullDetail & { rating: number | null }
    > = []
    await Promise.all(
      ratedMovies.map(async function (movie) {
        let response = await axios.get(url, {
          params: { apiKey: apiKey, i: movie.imdbID },
        })
        const movieFullDetailsWithRating = {
          ...response.data,
          rating: movie.rating,
        }

        movieArraywithFullDetails = [
          ...movieArraywithFullDetails,
          movieFullDetailsWithRating,
        ]
      })
    )
    setMovies(movieArraywithFullDetails)
  }

  const getGenres = () => {
    let tempArr: Array<string> = []
    movies?.map(({ Genre }) => {
      const genreToArray = Genre.split(', ')
      tempArr = [...tempArr, ...genreToArray]
    })
    setGenres([...new Set([...tempArr])])
  }

  useEffect(() => {
    getFullDetail()
  }, [])

  useEffect(() => {
    getGenres()
  }, [movies])

  return (
    <Box>
      {movies?.length === 0 ? (
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 3,
          }}
          maxWidth="lg"
        >
          <Typography variant="h5">No Rated movies</Typography>
        </Container>
      ) : (
        <Container
          sx={{ display: 'flex', flexDirection: 'column', py: 3 }}
          maxWidth="lg"
        >
          <Typography variant="subtitle1">Filter by genre</Typography>
          <Select
            sx={{ marginBottom: '16px' }}
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
                  )}
          </>
        </Container>
      )}
    </Box>
  )
}
