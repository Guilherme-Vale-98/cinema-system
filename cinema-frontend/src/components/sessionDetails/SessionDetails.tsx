import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store';
import { useGetMovieSessionByDateQuery } from '../../redux/services/api/cinemaApi';


type Props = {}

const SessionDetails = (props: Props) => {
  const { movieTitle, sessionId } = useParams<{ movieTitle: string, sessionId: string }>();
  const { data: movie, error, isLoading } = useGetMovieSessionByDateQuery({ movieTitle, sessionId });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as any).message}</p>;
  if (!movie) return <p>Movie not found</p>;
  
  
  console.log(movie, isLoading)

  return (
    <div>SessionDetails:{movie.title}: {movie.sessions[0].startTime.toString()}</div>
  )
}

export default SessionDetails