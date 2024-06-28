import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store';
import { useGetMovieSessionByDateQuery } from '../../redux/services/api/cinemaApi';
import TicketSummary from './TicketSummary';
import { FaUserNinja } from 'react-icons/fa';
import SeatsGrid from './SeatsGrid';
import { Seat } from '../../types/SeatType';


type Props = {}

const SessionDetails = (props: Props) => {
  const { movieTitle, sessionId } = useParams<{ movieTitle: string, sessionId: string }>();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  
  const { data: movie, error, isLoading } = useGetMovieSessionByDateQuery({ movieTitle, sessionId });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as any).message}</p>;
  if (!movie) return <p>Movie not found</p>;


  console.log(movie, isLoading)

  return (
    <section className='min-h-[600px] pb-4 bg-[#3f546e]' >
      <div className='flex h-32 w-4/5 mx-auto  pb-6 z-10 px-8 justify-between items-end border-b-2'>
      </div>
      <div className='flex mt-4 w-4/5 mx-auto '>

        <TicketSummary movie={movie} seats={selectedSeats}></TicketSummary>

        <div className=' rounded-lg w-full flex-col ml-4 justify-between flex h-[600px] p-4 bg-[#111827]'>
            <SeatsGrid selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/> 
            <div className='border-b-4 rounded-t-xl text-center text-white text-xl font-bold bg-[#666a6f] '>
              TELA
            </div>
        </div>
      </div>

    </section >
  )
}

export default SessionDetails