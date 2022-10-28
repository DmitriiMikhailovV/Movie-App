import { FC } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from '@mui/material'

import { TRatedMovieCard } from './types'

export const RatedMovieCard: FC<TRatedMovieCard> = ({
  Poster,
  Title,
  Year,
  Type,
  Genre,
  rating,
}) => {
  return (
    <Grid
      container
      sx={{
        flexDirection: 'column',
        alignContent: 'center',
        marginBottom: '16px',
      }}
    >
      <Card sx={{ display: 'flex', minWidth: '100%' }}>
        <CardMedia
          component="img"
          sx={{ width: 200, display: { xs: 'none', sm: 'block' } }}
          image={Poster}
          alt={Title}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5" paragraph>
            Title: {Title}
          </Typography>
          <Typography variant="subtitle1">Year: {Year}</Typography>
          <Typography variant="subtitle1">Type: {Type}</Typography>
          <Typography variant="subtitle1">Genre: {Genre}</Typography>
          <Typography variant="subtitle1">Movie Rating:</Typography>
          <Rating name="read-only" value={rating} readOnly />
        </CardContent>
      </Card>
    </Grid>
  )
}
