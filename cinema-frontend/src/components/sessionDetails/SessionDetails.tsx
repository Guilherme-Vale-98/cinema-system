import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store';
import { useGetMovieSessionByDateQuery } from '../../redux/services/api/cinemaApi';
import TicketSummary from './TicketSummary';
import { FaUserNinja } from 'react-icons/fa';
import SeatsGrid from './SeatsGrid';


type Props = {}

const SessionDetails = (props: Props) => {
  const { movieTitle, sessionId } = useParams<{ movieTitle: string, sessionId: string }>();
  const { data: movie, error, isLoading } = useGetMovieSessionByDateQuery({ movieTitle, sessionId });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as any).message}</p>;
  if (!movie) return <p>Movie not found</p>;


  console.log(movie, isLoading)

  return (
    <section className='min-h-[600px] pb-4 bg-[#3f546e]' >
      <div className='flex h-32 w-4/5 mx-auto  pb-6 z-10 px-8 justify-between items-end border-b-2'>
        <span>SessionDetails:{movie.title}: {movie.sessions[0].startTime.toString()}</span>
      </div>
      <div className='flex w-4/5 mx-auto border '>

        <TicketSummary movie={movie}></TicketSummary>

        <div className='border w-full flex-col justify-between flex h-[600px] p-4 bg-gray-500'>
            <SeatsGrid/> 
            <div className='border-b-4 rounded-t-xl text-center text-white text-xl font-bold bg-[#21262D] '>
              TELA
            </div>
        </div>

      </div>

    </section >
  )
}

export default SessionDetails