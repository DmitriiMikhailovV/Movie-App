import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Pagination } from 'src/Components/generic'
import { searchMovies } from 'src/Redux/features/movie/moviesSlice'
import { AppDispatch, useAppSelector } from 'src/Redux/store'

export const Search: FC = () => {
  const [page, setPage] = useState(1)
  const { moviesData, totalResults } = useAppSelector(
    (state) => state.moviesData
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(searchMovies({ page }))
  }, [page])

  const handleChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  console.log(page)
  console.log(moviesData)

  return (
    <>
      {moviesData?.map((item) => (
        <div>{item.Title}</div>
      ))}
      <Pagination total={totalResults} page={page} onChange={handleChange} />
    </>
  )
}
