import { FC, useEffect, useState } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  // Rating,
  Button,
} from '@mui/material'
// import { useDispatch } from 'react-redux'

// import { addRatingOfMovie } from 'src/Redux/features/movies/moviesSlice'
// import { AppDispatch, useAppSelector } from 'src/Redux/store'

import type { TMovieCard } from './types'
import { useNavigate } from 'react-router-dom'

export const SearchedMovieCard: FC<TMovieCard> = ({
  imdbID,
  Poster,
  Title,
  Year,
}) => {
  // console.log(imdbID)
  // const { ratedMovies } = useAppSelector((state) => state.moviesData)
  // const ratingOfMovie = ratedMovies.find(({ imdbID }) => imdbID === imdbID)
  // const [rating, setRating] = useState<number | null>(null)

  // const [ratingMovie, setRatingMovie] = useState<
  //   | {
  //       imdbID: string
  //       rating: number | null
  //     }
  //   | undefined
  // >(ratingOfMovie)
  // const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  // ratingOfMovie && setRatingMovie(ratingOfMovie)

  // const ratedMovie = { imdbID, rating: rating }

  // const handleClick = () => {
  //   console.log(ratingMovie)
  //   dispatch(addRatingOfMovie(ratingMovie))
  // }

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
        {/* Rate the movie:
        <Rating
          name="simple-controlled"
          value={ratingMovie?.rating}
          onChange={(e, newValue) => {
            setRatingMovie({ ...ratingMovie, rating: newValue })
          }}
        /> */}
        {/* <Button onClick={handleClick} variant="contained">
          Submit Rating
        </Button> */}
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
