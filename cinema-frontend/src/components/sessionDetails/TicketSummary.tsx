import React from 'react'
import { Movie } from '../../types/MovieType'
import { Seat } from '../../types/SeatType'

type Props = {
    movie: Movie,
    seats: Seat[]
}

const TicketSummary = ({ movie, seats }: Props) => {


    return (
        <div className='flex p-4 rounded-md text-white 
    flex-col bg-[#111827] w-[450px] h-[600px]'>
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
                    {seats.map((seat,index)=> <p key={index}>{seat.row+seat.column}</p>)}
                </div>
            </div>
            <div className='border-t mt-auto gap-1 text-lg flex flex-col'>
                <span className='flex justify-between'>
                    Itens <p>{seats.length}</p>
                </span>
                <span>Taxas</span>
                <span className='font-bold  flex justify-between'>Total: 
                    <p>R$ {seats.reduce((total, seat)=> total + seat.price, 0)}</p></span>
            </div>
        </div>
    )
}

export default TicketSummary