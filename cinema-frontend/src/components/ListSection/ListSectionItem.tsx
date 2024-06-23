import React from 'react'
import { CiDollar } from 'react-icons/ci'
import SessionsButton from './SessionsButton'
import { Movie } from '../../types/MovieType'

type Props = {
  movie: Movie
}

const ListSectionItem = ({movie}: Props) => {

  return (
    <li className='bg-gray-800 flex flex-wrap rounded-lg gap-4 mb-10 p-6'
    >
      <img src={movie.posterPath} className='w-[187px] rounded-md h-[275px] object-fill' />
      <div className='w-[900px]'>
        <div className='font-semibold flex flex-wrap justify-between text-4xl'>
          <span>{movie.title}</span>
          <div className='font-normal text-xl flex  items-center'>
            <CiDollar className='w-8 h-8 mt-1' />Preços
          </div>
          <span className='text-xl border-b-2 w-full py-6'>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</span>
        </div>
        <div className='mt-5 flex gap-3 flex-wrap'>
          <span className='text-lg w-full'>Horários:</span>
          {movie.sessions?.map((session, index) => 
            <SessionsButton key={index} startTime={session.startTime}/>
          )}
        </div>
      </div>
    </li>
  )
}

export default ListSectionItem