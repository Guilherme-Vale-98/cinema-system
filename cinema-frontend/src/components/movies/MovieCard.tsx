import React from 'react'
import { Movie } from '../../types/MovieType'
import './MovieCardStyle.css'
type Props = {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    return (
        <div className="card">
            <img src={movie.posterPath} className='w-[340px] h-[465px] object-fill' />
            <div className='flex flex-wrap justify-center'>
                <div className='min-h-[60px] m-2'>
                    <h2 className='font-bold cursor-pointer text-center hover:text-red-600 duration-200 text-3xl'>{movie.title}</h2>
                </div>
                <span className='text-lg w-full font-[520] text-gray-300 text-center'>{Math.floor(movie.runtime / 60)} HR {movie.runtime % 60} MIN</span>
            </div>
        </div>
    )
}

export default MovieCard