import React from 'react'
import SeatRow from './SeatRow'


type Props = {}


const SeatsGrid = (props: Props) => {
    return (
        <div className='w-full p-4 flex pr-10 gap-2 flex-col h-full mb-4'>
            <SeatRow rowLetter={'A'}/>
            <SeatRow rowLetter={'B'}/>
            <SeatRow rowLetter={'C'}/>
            <SeatRow rowLetter={'D'}/>
            <SeatRow rowLetter={'F'}/>
            <SeatRow rowLetter={'G'}/>
            <div className='w-full flex gap-2 mt-10  flex-col h-full'>
                <SeatRow rowLetter={'H'}/>
                <SeatRow rowLetter={'I'}/>
                <SeatRow rowLetter={'J'}/>
            </div>
        </div>
    )
}

export default SeatsGrid