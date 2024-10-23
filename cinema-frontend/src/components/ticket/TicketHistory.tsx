import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { useGetTicketsByUserIdQuery } from '../../redux/services/api/cinemaApi';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ErrorComponent from '../error/ErrorComponent';
import TicketCard from './TicketCard';
import { UserMenuState } from '../../types/MenuState';


type Props = {
    setMenuState: React.Dispatch<React.SetStateAction<string>>
}

const TicketHistory = ({ setMenuState }: Props) => {
    const user = useAppSelector((state: RootState) => state.userState.user);
    const navigate = useNavigate();
    const [load, setLoad] = useState(true);
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user]);

    if (!user) {
        return null
    }

    const { data: tickets, error, isLoading } = useGetTicketsByUserIdQuery(user.id);
    if (error) return (<div className=" flex items-center justify-center h-screen w-full">
        <ErrorComponent errorMessage={(error as any).data} />
    </div>);


    console.log(tickets);
    return (
        <div className='p-32 bg-[#3f546e] w-full '>
            <div className='border-8 p-4 h-[600px] overflow-scroll bg-gray-900 rounded-md w-full border-amber-900  text-3xl flex-wrap font-bold text-white'>
                <div className='text-center'>Seu histórico de ingressos</div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
                    {isLoading && <div className='flex justify-center items-center col-span-full'>
                        <ClipLoader  color='blue'/>
                    </div>}
                    {tickets?.map((ticket: any) => <TicketCard ticket={ticket} />)}
                </div>
                <div className="flex w-1/3 mx-auto gap-8">
                    <button onClick={() => setMenuState(UserMenuState.Initial)}
                        type="submit" className='bg-red-500 w-1/2 hover:bg-red-600 text-white font-bold px-4 rounded-md'>
                        voltar
                    </button>
                    <button
                        type="submit" className='bg-green-500 w-1/2 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md'>
                        download
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TicketHistory