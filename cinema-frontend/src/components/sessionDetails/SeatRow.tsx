import React, { useState } from 'react'
import { Seat } from '../../types/SeatType'
import { FaUser } from 'react-icons/fa6'
import {motion} from 'framer-motion'

type Props = {
    rowLetter: string
    selectedSeats: Seat[],
    setSelectedSeats: React.Dispatch<React.SetStateAction<Seat[]>>
    takenSeats: Seat[]
}

const SeatRow = ({ rowLetter, selectedSeats, setSelectedSeats, takenSeats }: Props) => {



    const handleSeatClick = (seat: Seat) => {
        const isSeatSelected = selectedSeats.some(e => e.column === seat.column && e.row === seat.row)

        if (isSeatSelected) {
            const newSelectedSeats = selectedSeats
                .filter((e) => e.column !== seat.column || e.row !== seat.row)
            return setSelectedSeats(newSelectedSeats)
        }


        if (selectedSeats.length > 7) return
        setSelectedSeats([...selectedSeats, seat])
    }
    const seats = [...Array(16)].map((_, index) => {
        const seat: Seat = { row: rowLetter, column: String(index + 1), price: 30, seatType: "INTEIRA" }

        const isSeatSelected = selectedSeats.some(e => e.column === seat.column && e.row === seat.row)

        const isSeatTaken = takenSeats.some(e => e.column === seat.column && e.row === seat.row)
        
        if(isSeatTaken){
            return (
                <motion.button
                    key={index}
                    disabled
                    className={`w-8 h-8 mx-[1px] 
                     bg-gray-600
                    rounded-full relative text-base text-black flex items-center justify-center`}>
                        <FaUser></FaUser>
                </motion.button>)
        }


        return (
            <motion.button onClick={() => handleSeatClick(seat)}
                key={index} 
                whileTap={{scale: 1.5}}
                /*  transition={{
                    type: "keyframes",
                    values: [0.5, 1],  
                    times: [0, 1],     
                    duration: 0.1,     
                    ease: "easeInOut"  
                }} */
                transition={{type: "spring", stiffness: 600}}
                className={`w-8 h-8 mx-[1px] 
                ${isSeatSelected ? "bg-yellow-400 z-10 border-gray-300 border-2" : "bg-blue-600"}
                rounded-full relative text-base text-black`}>

                    {isSeatSelected ?  seat.row+seat.column  : ""}
            </motion.button>)
    })

   
   
   
   
    return (
        <div className=' text-xl w-full text-white justify-between flex'>
            <div className='flex  w-[15px] text-justify mt-[2px]'>{rowLetter}</div>
            <div className='flex  gap-1'>{seats.slice(0,12)}</div>
            <div className='flex  '>{seats.slice(12,16)}</div>
            <div className='flex  w-[15px] text-justify mt-[2px]'>{rowLetter}</div>
        </div>
    )
}

export default SeatRow