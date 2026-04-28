import React from 'react'

export type TicketHistorySeat = {
    row: string;
    column: string;
    seatType: string;
    price: number;
}

export type TicketHistoryItem = {
    movieTitle: string;
    startTime: string;
    seats: TicketHistorySeat[];
    totalPrice: number;
    status: "upcoming" | "past";
}

type Props = {
    ticket: TicketHistoryItem
}

const TicketCard = ({ ticket }: Props) => {
    const { movieTitle, seats, startTime, status, totalPrice } = ticket
    const statusLabel = status === "upcoming" ? "Disponível" : "Finalizado";
    const statusClass = status === "upcoming"
        ? "bg-green-600 text-white"
        : "bg-gray-600 text-gray-100";

    return (
        <div className="max-w-sm w-full mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="font-bold text-xl text-white">{movieTitle}</div>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${statusClass}`}>
                        {statusLabel}
                    </span>
                </div>
                <p className="text-gray-300 text-base mb-2">
                    <strong>Data:</strong> {startTime}
                </p>
                <p className="text-gray-300 text-base mb-2">
                    <strong>Assentos:</strong> {seats.map((seat) => `${seat.row}${seat.column}`).join(", ")}
                </p>
                <div className="text-gray-300 text-base mb-2">
                    <strong>Ingressos:</strong>
                    <ul className="mt-1 space-y-1">
                        {seats.map((seat, index) => (
                            <li key={`${seat.row}-${seat.column}-${index}`}>
                                {seat.row}{seat.column} - {seat.seatType} - R${seat.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="text-gray-100 text-lg font-bold mt-4">
                    Total: R${totalPrice.toFixed(2)}
                </p>
                <button
                    disabled
                    type="button"
                    className="mt-5 w-full bg-gray-600 text-gray-300 font-bold py-3 px-4 rounded-md cursor-not-allowed"
                >
                    download
                </button>
            </div>
        </div>
    )
}

export default TicketCard
