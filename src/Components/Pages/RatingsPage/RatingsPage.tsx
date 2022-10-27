import { FC } from 'react'
import { Box, Container } from '@mui/material'
import { RatedMovieCard } from 'src/Components/generic'
import { useAppSelector } from 'src/Redux/store'

export const RatingsPage: FC = () => {
  const { ratedMovies } = useAppSelector((state) => state.moviesData)
  return (
    <Box>
      <Container sx={{ py: 3 }} maxWidth="lg">
        {ratedMovies.map(
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
      </Container>
    </Box>
  )
}
