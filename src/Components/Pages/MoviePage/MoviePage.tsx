import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchMovieById } from 'src/Components/Hooks'
import { addRatingOfMovie } from 'src/Redux/features/movies/moviesSlice'
import { AppDispatch, useAppSelector } from 'src/Redux/store'

export const MoviePage: FC = () => {
  const { imdbID } = useParams()
  const { movie, loading, apiError, error } = useFetchMovieById(imdbID)
  const { ratedMovies } = useAppSelector((state) => state.moviesData)
  const [ratingMovie, setRatingMovie] = useState<{
    imdbID: string | undefined
    rating: number | null
  }>({ imdbID: imdbID, rating: null })
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    const ratingOfMovie = ratedMovies.find(
      ({ imdbID }) => imdbID === movie?.imdbID
    )
    console.log(ratingOfMovie)

    ratingOfMovie && setRatingMovie(ratingOfMovie)
  }, [movie])

  const handleClick = () => {
    dispatch(addRatingOfMovie(ratingMovie))
  }

  error && console.log(error)

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : apiError ? (
        apiError
      ) : (
        <Grid
          container
          sx={{
            flexDirection: 'column',
            alignContent: 'center',
            marginBottom: '16px',
          }}
        >
          <Card
            sx={{
              display: 'flex',
              minWidth: '100%',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 300, maxWidth: '100%' }}
              image={movie?.Poster}
              alt={movie?.Title}
            />
            <CardContent sx={{ flex: 1 }}>
              <Button
                sx={{
                  marginBottom: '16px',
                }}
                variant="contained"
                onClick={() => navigate(-1)}
              >
                Back to search
              </Button>
              <Typography component="h2" variant="h5" paragraph>
                Title: {movie?.Title}
              </Typography>
              <Typography variant="subtitle1">Year: {movie?.Year}</Typography>
              <Typography variant="subtitle1">
                Year: {movie?.Runtime}
              </Typography>
              <Typography variant="subtitle1">Genre: {movie?.Genre}</Typography>
              <Typography variant="subtitle1">
                Director: {movie?.Director}
              </Typography>
              <Typography variant="subtitle1">
                Actors: {movie?.Actors}
              </Typography>
              <Typography variant="subtitle1">
                Description: {movie?.Plot}
              </Typography>
              <Typography variant="subtitle1">Movie Rating:</Typography>
              <Grid
                container
                sx={{
                  marginTop: '8px',
                  flexDirection: 'column',
                  alignContent: 'flex-start',
                }}
              >
                <Rating
                  name="read-only"
                  sx={{
                    marginBottom: '8px',
                  }}
                  value={ratingMovie?.rating}
                  onChange={(e, newValue) => {
                    setRatingMovie({ ...ratingMovie, rating: newValue })
                  }}
                />
                <Button onClick={handleClick} variant="contained">
                  Submit Rating
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  )
}
