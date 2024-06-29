import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store';
import ingressoWebp from "../../../public/ingresso.webp"
import { useGetMovieSessionByDateQuery } from '../../redux/services/api/cinemaApi';
import { FaMinus, FaPlus, FaUserNinja } from 'react-icons/fa';
import SeatsGrid from './SeatsGrid';
import { Seat } from '../../types/SeatType';
import { Movie } from '../../types/MovieType';
import { BiDownArrow, BiMinus } from 'react-icons/bi';
import { FaArrowDownAZ } from 'react-icons/fa6';


type Props = {}

 

const SessionDetails = (props: Props) => {
  const [buySteps, setBuysteps] = useState(0);
  
   const { movieTitle, sessionId } = useParams<{ movieTitle: string, sessionId: string }>();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  
  const { data: movie, error, isLoading } = useGetMovieSessionByDateQuery({ movieTitle, sessionId });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as any).message}</p>;
  if (!movie) return <p>Movie not found</p>;
  

  const handleSelectChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedSeats = [...selectedSeats];
    const selectedSeat = newSelectedSeats[index];

    selectedSeat.type = event.target.value as 'meia' | 'inteira';
    selectedSeat.price = event.target.value === 'meia' ? selectedSeat.price / 2 : selectedSeat.price * 2;

    newSelectedSeats[index] = selectedSeat;
    setSelectedSeats(newSelectedSeats);
  };
  const renderSeatsGrid = () =>{
    return (
      <div className=' rounded-lg w-full flex-col ml-4 justify-between flex h-[600px] p-4 bg-[#111827]'>
            <SeatsGrid selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}/> 
            <div className='border-b-4 rounded-t-xl text-center text-white text-xl font-bold bg-[#666a6f] '>
              TELA
            </div>
        </div>
    )
  }

  const ListItem: React.FC<{ selectedSeat: Seat, index: number}> = ({ selectedSeat, index}) => {
    return (
      <li className='flex text-white justify-evenly text-lg items-center mb-2 p-2 rounded-lg bg-[#3b424d]'>  
        <div className='flex justify-center items-center gap-5'>
          <img  className='w-16 h-16'src={ingressoWebp}/>
          <p className=' text-gray-200 font-semibold'>Assento: {selectedSeat.row + selectedSeat.column}</p>

        </div>
        <div className='after:flex  after:duration-200 after:ease-linear after:transition-all hover:after:text-orange-700 after:items-center after:left-[75%] after:justify-center after:pointer-events-none after:absolute  after:h-10 after:w-10 after:bg-[#3f4c68] after:content-["\25BC"] flex relative items-center text-white justify-center w-40 h-10 overflow-hidden rounded-md '>
          <select 
          className='w-full pl-4 appearance-none bg-[#111827] h-10'
          value={selectedSeat.type} onChange={(event) => handleSelectChange(index, event)}>
            <option value="inteira">Inteira</option>
            <option value="meia">Meia</option>
          </select>
        </div>
        <span className='flex font-semibold text-gray-200 items-center justify-center 
        h-8 w-32'>
         Preço: R$ {selectedSeat.price}
        </span>
      </li>
    );
  };
  
  const renderTicketTypes = () => {
    return (
      <div className='rounded-lg w-full flex-col ml-4 overflow-scroll flex h-[600px] p-4 bg-[#111827]'>
        <span className='text-base font-semibold text-red-500'>Os ingressos meia-entrada requerem apresentação de documento.</span>
        <ul>
          {selectedSeats.map((selectedSeat, index) =>
            <ListItem selectedSeat={selectedSeat} index={index} key={index}/> )}
        </ul>
      </div>
    );
  };

const renderTicketSummary = (movie: Movie, seats: Seat[]) => {
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
              <span className='font-bold  flex justify-between'>Total: 
                  <p> R$ {seats.reduce((total, seat)=> total + seat.price, 0)}</p></span>
          </div>
          <div className='mt-10 gap-1 text-lg flex'>
              
              <button
              disabled={buySteps<=0}
              className={`bg-blue-600  w-1/2 font-bold text-xl h-9 disabled:bg-gray-400  rounded-xl shadow-md active:bg-blue-800`}
               
               onClick={()=> buySteps > 0 ? setBuysteps(buySteps-1): ''}>VOLTAR</button>
              
              <button 
              disabled={buySteps > 1}
              className='bg-blue-600 disabled:bg-gray-400 w-1/2 font-bold text-xl h-9 rounded-xl active:bg-blue-800 shadow-md' onClick={()=> buySteps < 2 ? setBuysteps(buySteps+1): ''}>CONTINUAR</button>
          </div>
      </div>
  )
}




  return (
    <section className='min-h-[600px] mt-16 p-4 bg-[#3f546e]' >
{/*        <div className='flex h-32 w-4/5 mx-auto pb-6 z-10 px-8 justify-between items-end border-b-2'> </div>  */}
      <div className='flex mt-4 border-t-2 pt-4 w-4/5 mx-auto '>

        {renderTicketSummary(movie, selectedSeats)}
        {buySteps === 0 ? renderSeatsGrid(): ''}
        {buySteps === 1 ? renderTicketTypes(): ''}
        
      </div>

    </section >
  )
}

export default SessionDetails