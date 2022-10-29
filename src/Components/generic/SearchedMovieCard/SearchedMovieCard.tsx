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

export const SearchedMovieCard: FC<TMovieCard> = ({
  imdbID,
  Poster,
  Title,
  Year,
  rating,
  onChange,
  navigate,
}) => {
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
            onChange(rating, newValue, imdbID)
          }}
        />
        <Typography gutterBottom variant="h6">
          {Title} ({Year})
        </Typography>
        <Button onClick={() => navigate(imdbID)} variant="contained">
          Detail
        </Button>
      </CardContent>
    </Card>
  )
}
