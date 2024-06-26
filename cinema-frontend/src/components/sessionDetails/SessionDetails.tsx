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
    <section className='min-h-[600px] bg-[#3f546e]' >
      <div className='flex h-32 w-4/5 mx-auto  pb-6 z-10 px-8 justify-between items-end border-b-2'>
        <span>SessionDetails:{movie.title}: {movie.sessions[0].startTime.toString()}</span>
      </div>
      <div className='flex w-4/5 mx-auto border '>

        <div className='border flex p-4 text-white 
            flex-col bg-red-900 w-[450px] h-[600px]'>
          <div className='flex mb-4 h-10  
           font-semibold items-center text-lg'>
            Resumo do pedido
          </div>
          <div className='flex gap-2 font-bold text-lg'>
            <img src={movie.posterPath} className='w-[40%] '></img>
            <span>{movie.title}</span>
          </div>
          <div className='border-b border-t mt-2 p-2 text-lg font-bold'>
            <span>{movie.sessions[0].startTime.toString()}</span>
          </div>
          <div className='mt-2 text-lg justify-between flex font-bold'>
            Assentos
            <div className='flex ml-6 gap-1 flex-wrap'>
              <p>B2</p>
              <p>B2</p>
              <p>B2</p>
            </div>
          </div>
          <div className='border-t mt-32 gap-1 text-lg flex flex-col'>
            <span className='flex justify-between'>
              Itens <p>8</p>
            </span>
            <span>Taxas</span>
            <span className='font-bold'>Total</span>
          </div>
        </div>

        <div className='border w-full h-[600px] bg-gray-500'>

        </div>

      </div>

    </section >
  )
}

export default SessionDetails