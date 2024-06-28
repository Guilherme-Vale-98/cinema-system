import React from 'react'
import SeatRow from './SeatRow'
import { Seat } from '../../types/SeatType'


type Props = {
    selectedSeats: Seat[],
    setSelectedSeats: React.Dispatch<React.SetStateAction<Seat[]>>
}


const SeatsGrid = ({selectedSeats, setSelectedSeats}: Props) => {
    return (
        <div className='w-full p-4 flex pr-10 gap-2 flex-col h-full mb-4'>
            <SeatRow rowLetter={'A'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
            
            <SeatRow rowLetter={'B'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
            
            <SeatRow rowLetter={'C'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
            
            <SeatRow rowLetter={'D'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
            
            <SeatRow rowLetter={'F'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
            
            <SeatRow rowLetter={'G'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
            
            <div className='w-full flex gap-2 mt-10  flex-col h-full'>
                <SeatRow rowLetter={'H'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
                <SeatRow rowLetter={'I'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
                <SeatRow rowLetter={'J'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/>
            </div>
        </div>
    )
}

export default SeatsGrid