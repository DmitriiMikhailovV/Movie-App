import { FC } from 'react'
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
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchMovieById } from 'src/Components/Hooks'
import { addRatingOfMovie } from 'src/Redux/features/movies/moviesSlice'
import { AppDispatch, useAppSelector } from 'src/Redux/store'

export const MoviePage: FC = () => {
  const { imdbID } = useParams()
  const { movie, loading, apiError, error } = useFetchMovieById(imdbID)
  const { ratedMovies } = useAppSelector((state) => state.moviesData)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onChangeRating = (newValue: number | null) => {
    dispatch(
      addRatingOfMovie({
        ...ratedMovies.find((ratedMovie) => ratedMovie.imdbID === imdbID),
        rating: newValue,
        imdbID: imdbID,
      })
    )
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
                  value={
                    ratedMovies.find((movie) => movie.imdbID === imdbID)
                      ?.rating === undefined
                      ? null
                      : ratedMovies.find((movie) => movie.imdbID === imdbID)
                          ?.rating
                  }
                  onChange={(e, newValue) => {
                    onChangeRating(newValue)
                  }}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  )
}
