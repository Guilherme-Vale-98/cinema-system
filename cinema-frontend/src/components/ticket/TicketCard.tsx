import React from 'react'

type Props = {
    ticket: any
}

const TicketCard = ({ ticket }: Props) => {
    const { movieTitle, seat, startTime } = ticket
    return (
        <div className="max-w-sm mx-auto cursor-pointer bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-white">{movieTitle}</div>
                <p className="text-gray-300 text-base">
                    <strong>Data:</strong>  {startTime.toString()}
                </p>
                <p className="text-gray-300 text-base">
                    <strong>Assento:</strong> {seat.row}{" "}{seat.column}
                </p>
                <p className="text-gray-300 text-base">
                    <strong>Tipo:</strong> {seat.seatType}
                </p>
                <p className="text-gray-300 text-base">
                    <strong>Preço:</strong> R${seat.price.toFixed(2)}
                </p>
            </div>
        </div>
    )
}

export default TicketCard