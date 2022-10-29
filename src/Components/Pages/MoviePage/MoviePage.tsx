import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from '@mui/material'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { searchMovieById } from 'src/Redux/features/movieById/movieByIdSlice'
import { AppDispatch, useAppSelector } from 'src/Redux/store'

export const MoviePage: FC = () => {
  const { imdbID } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { movie, apiResponse, apiError, errorMovie, loadingMovie } =
    useAppSelector((state) => state.movieById)

  useEffect(() => {
    dispatch(searchMovieById({ imdbID }))
  }, [])

  errorMovie && console.log(errorMovie)

  return (
    <>
      {loadingMovie ? (
        <CircularProgress />
      ) : apiResponse === 'False' ? (
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
              <Rating name="read-only" readOnly />
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  )
}
