import React from 'react'
import { Movie } from '../../types/MovieType'

type Props = {
    movie: Movie
}

const TicketSummary = ({ movie }: Props) => {
    return (
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
    )
}

export default TicketSummary