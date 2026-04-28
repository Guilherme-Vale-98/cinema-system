import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useGetTicketsByUserIdQuery } from '../../redux/services/api/cinemaApi';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { UserMenuState } from '../../types/MenuState';
import ErrorComponent from '../error/ErrorComponent';
import WarningComponent from '../error/WarningComponent';
import TicketCard, { TicketHistoryItem, TicketHistorySeat } from './TicketCard';

type Props = {
    setMenuState: React.Dispatch<React.SetStateAction<string>>
}

type TicketHistoryTab = "upcoming" | "past";

type TicketApiItem = {
    movieTitle: string;
    startTime: string;
    seat: {
        row: string;
        column: string;
        seatType?: string;
        type?: string;
        price: number;
    }
}

const parseSessionDate = (startTime: string) => {
    const parsedDate = new Date(startTime);
    if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate;
    }

    const [datePart, timePart = "00:00"] = startTime.split(" ");
    const [day, month, year] = datePart.split("/");
    if (!day || !month || !year) {
        return new Date(0);
    }

    return new Date(`${year}-${month}-${day}T${timePart}:00`);
}

const getTicketStatus = (startTime: string): TicketHistoryTab => {
    return parseSessionDate(startTime).getTime() > Date.now() ? "upcoming" : "past";
}

const groupTicketsBySession = (tickets: TicketApiItem[] = []): TicketHistoryItem[] => {
    const groupedTickets = tickets.reduce<Record<string, TicketHistoryItem>>((acc, ticket) => {
        const groupKey = `${ticket.movieTitle}-${ticket.startTime}`;
        const seat: TicketHistorySeat = {
            row: ticket.seat.row,
            column: ticket.seat.column,
            seatType: ticket.seat.seatType ?? ticket.seat.type ?? "INTEIRA",
            price: ticket.seat.price,
        };

        if (!acc[groupKey]) {
            acc[groupKey] = {
                movieTitle: ticket.movieTitle,
                startTime: ticket.startTime,
                seats: [],
                totalPrice: 0,
                status: getTicketStatus(ticket.startTime),
            };
        }

        acc[groupKey].seats.push(seat);
        acc[groupKey].totalPrice += seat.price;

        return acc;
    }, {});

    return Object.values(groupedTickets).sort((firstTicket, secondTicket) => {
        return parseSessionDate(firstTicket.startTime).getTime() - parseSessionDate(secondTicket.startTime).getTime();
    });
}

const TicketHistory = ({ setMenuState }: Props) => {
    const user = useAppSelector((state: RootState) => state.userState.user);
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState<TicketHistoryTab>("upcoming");

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [navigate, user]);

    const { data: tickets, error, isLoading } = useGetTicketsByUserIdQuery({});

    const groupedTickets = useMemo(() => groupTicketsBySession(tickets), [tickets]);
    const visibleTickets = groupedTickets.filter((ticket) => ticket.status === selectedTab);

    if (!user) {
        return null
    }

    if (error) return (<div className="flex items-center justify-center h-screen w-full">
        <ErrorComponent errorMessage={(error as any).data} />
    </div>);

    const renderEmptyState = () => {
        if (groupedTickets.length === 0) {
            return <WarningComponent warningMessage="Você ainda não comprou ingressos." />
        }

        if (selectedTab === "upcoming") {
            return <WarningComponent warningMessage="Você não possui ingressos próximos." />
        }

        return <WarningComponent warningMessage="Você não possui ingressos finalizados." />
    }

    return (
        <div className='p-32 bg-[#3f546e] w-full '>
            <div className='border-8 p-4 h-[600px] overflow-scroll bg-gray-900 rounded-md w-full border-amber-900 text-3xl flex-wrap font-bold text-white'>
                <div className='text-center'>Meus ingressos</div>
                <div className='flex justify-center gap-4 mt-6'>
                    <button
                        type="button"
                        onClick={() => setSelectedTab("upcoming")}
                        className={`text-xl font-bold px-6 py-2 rounded-md ${selectedTab === "upcoming" ? "bg-amber-500 text-gray-900" : "bg-gray-700 text-white"}`}
                    >
                        Próximos
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedTab("past")}
                        className={`text-xl font-bold px-6 py-2 rounded-md ${selectedTab === "past" ? "bg-amber-500 text-gray-900" : "bg-gray-700 text-white"}`}
                    >
                        Histórico
                    </button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
                    {isLoading && <div className='flex justify-center items-center col-span-full'>
                        <ClipLoader color='blue' />
                    </div>}
                    {!isLoading && visibleTickets.length === 0 && <div className='col-span-full'>
                        {renderEmptyState()}
                    </div>}
                    {visibleTickets.map((ticket) => (
                        <TicketCard ticket={ticket} key={`${ticket.movieTitle}-${ticket.startTime}`} />
                    ))}
                </div>
            </div>
            <div className="flex w-1/3 mx-auto gap-8 mt-8">
                <button onClick={() => setMenuState(UserMenuState.Initial)}
                    type="submit" className='bg-red-500 w-1/2 hover:bg-red-600 text-white font-bold px-4 rounded-md'>
                    voltar
                </button>
            </div>
        </div>
    )
}

export default TicketHistory
