import React from 'react'
import { Movie } from '../../types/MovieType'

type Props = {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    return (
        <div className="card">
            <img src={movie.posterPath} className='w-[340px] h-[465px] object-fill' />

            <div className='flex flex-wrap justify-center'>
                <div className='min-h-[72px] m-2'>
                    <h2 className='font-bold cursor-pointer text-center hover:text-red-600 duration-200 text-3xl'>{movie.title}</h2>
                </div>
                <span className='text-lg w-full font-[520] text-gray-300 text-center'>{Math.floor(movie.runtime / 60)} HR {movie.runtime % 60} MIN</span>
                <button type="button" className=" bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center me-2 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Comprar ingresso</button>
            </div>

        </div>
    )
}

export default MovieCard