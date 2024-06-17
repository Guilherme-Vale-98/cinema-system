import React from 'react'
import movieList from '../movies/MovieList'
import { CiDollar } from 'react-icons/ci'
import SessionsButtons from './SessionsButtons'

type Props = {}

const ListSectionItem = (props: Props) => {

  return (
    <li className='bg-gray-800 flex flex-wrap rounded-lg gap-4 mb-10 p-6'
    >
      <img src={movieList[0].posterPath} className='w-[187px] rounded-md h-[275px] object-fill' />
      <div className='w-[900px]'>
        <div className='font-semibold flex flex-wrap justify-between text-4xl'>
          <span>{movieList[0].title}</span>
          <div className='font-normal text-xl flex  items-center'>
            <CiDollar className='w-8 h-8 mt-1' />Preços
          </div>
          <span className='text-xl border-b-2 w-full py-6'>{Math.floor(movieList[0].runtime / 60)}h {movieList[0].runtime % 60}min</span>
        </div>
        <div className='mt-5 flex gap-3 flex-wrap'>
          <span className='text-lg w-full'>Horários:</span>
          <SessionsButtons/>
        </div>
      </div>
    </li>
  )
}

export default ListSectionItem