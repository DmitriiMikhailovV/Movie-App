import { FC } from 'react'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import { TMovieCard } from './types'

export const MovieCard: FC<TMovieCard> = ({ Title, Year, Poster, ...rest }) => {
  return (
    <Card
      sx={{
        maxWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        margin: '16px',
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
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6">
          {Title} ({Year})
        </Typography>
      </CardContent>
    </Card>
  )
}
