import { FC } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Button,
} from '@mui/material'
import type { TMovieCard } from './types'
import { useNavigate } from 'react-router-dom'
import { addRatingOfMovie } from 'src/Redux/features/movies/moviesSlice'
import { AppDispatch } from 'src/Redux/store'
import { useDispatch } from 'react-redux'

export const SearchedMovieCard: FC<TMovieCard> = ({
  imdbID,
  Poster,
  Title,
  Year,
  rating,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onChangeRating = (newValue: number | null) => {
    dispatch(
      addRatingOfMovie({
        ...rating,
        rating: newValue,
        imdbID: imdbID,
      })
    )
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
        image={Poster}
        alt={Title}
      />
      <CardContent
        sx={{
          height: '100%',
        }}
      >
        Rate the movie:
        <Rating
          value={rating?.rating}
          onChange={(e, newValue) => {
            onChangeRating(newValue)
          }}
        />
        <Typography gutterBottom variant="h6">
          {Title} ({Year})
        </Typography>
        <Button
          onClick={() => navigate(`/movie/${imdbID}`)}
          variant="contained"
        >
          Detail
        </Button>
      </CardContent>
    </Card>
  )
}
