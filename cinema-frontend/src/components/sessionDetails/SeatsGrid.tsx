import React from 'react'
import SeatRow from './SeatRow'
import { Seat } from '../../types/SeatType'


type Props = {
    selectedSeats: Seat[],
    setSelectedSeats: React.Dispatch<React.SetStateAction<Seat[]>>
    takenSeats: Seat[]
}


const SeatsGrid = ({selectedSeats, setSelectedSeats, takenSeats}: Props) => {
    return (
        <div className='w-full p-4 flex pr-10 gap-2 flex-col h-full mb-4'>
            <SeatRow rowLetter={'A'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} takenSeats={takenSeats}/>
            
            <SeatRow rowLetter={'B'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} takenSeats={takenSeats}/>
            
            <SeatRow rowLetter={'C'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} takenSeats={takenSeats}/>
            
            <SeatRow rowLetter={'D'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} takenSeats={takenSeats}/>
            
            <SeatRow rowLetter={'F'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} takenSeats={takenSeats}/>
            
            <SeatRow rowLetter={'G'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} takenSeats={takenSeats}/>
            
            <div className='w-full flex gap-2 mt-10  flex-col h-full'>
                <SeatRow rowLetter={'H'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} takenSeats={takenSeats}/>
                <SeatRow rowLetter={'I'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} takenSeats={takenSeats}/>
                <SeatRow rowLetter={'J'} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} takenSeats={takenSeats}/>
            </div>
        </div>
    )
}

export default SeatsGrid