import { FC, useState } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Button,
} from '@mui/material'
import { useDispatch } from 'react-redux'

import { addRatingOfMovie } from 'src/Redux/features/movies/moviesSlice'
import { AppDispatch } from 'src/Redux/store'

import type { TMovieCard } from './types'
import { useNavigate } from 'react-router-dom'

export const SearchedMovieCard: FC<TMovieCard> = ({ movie, ...rest }) => {
  const [rating, setRating] = useState<number | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const ratedMovie = { ...movie, rating: rating }

  const handleClick = () => {
    dispatch(addRatingOfMovie(ratedMovie))
  }

  return (
    <Card
      sx={{
        maxWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        margin: '16px',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia
        component="img"
        sx={{
          9: 16,
        }}
        image={movie.Poster}
        alt={movie.Title}
      />
      <CardContent>
        Rate the movie:
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(e, newValue) => {
            setRating(newValue)
          }}
        />
        <Button onClick={handleClick} variant="contained">
          Submit Rating
        </Button>
        <Typography gutterBottom variant="h6">
          {movie.Title} ({movie.Year})
        </Typography>
        <Button
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
          variant="contained"
        >
          Detail
        </Button>
      </CardContent>
    </Card>
  )
}
