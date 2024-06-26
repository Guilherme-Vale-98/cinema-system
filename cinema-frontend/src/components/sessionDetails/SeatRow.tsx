import React from 'react'

type Props = {
    rowLetter: string
}

const SeatRow = ({rowLetter}: Props) => {
    
    const seats = [...Array(12)].map((_, index) => (
        <button onClick={()=> console.log(index, rowLetter)}
        key={index} className='w-8 h-8 mx-[1px] rounded-full bg-blue-600 text-center'>
            {index + 1}
        </button>
    ))
    const seats2 = [...Array(4)].map((_, index) => (
        <button onClick={() => console.log(rowLetter, index+ 13)} 
        key={index} className='w-8 h-8 mx-[1px] rounded-full bg-blue-600 text-center'>
            {index + 1}
        </button>
    ))
    


  
    return (
    <div className=' h-10 text-xl w-full justify-between flex'>
        <div>{rowLetter}</div>
        <div >{seats}</div>
        <div >{seats2}</div>
        <div>{rowLetter}</div>       
    </div>
  )
}

export default SeatRow