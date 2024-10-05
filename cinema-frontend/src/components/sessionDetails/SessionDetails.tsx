import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import ingressoWebp from "../../../src/assets/ingresso.webp"
import debitCard from "../../../src/assets/debitcard.png"
import { useGetMovieSessionByDateQuery, usePostTicketsMutation } from '../../redux/services/api/cinemaApi';
import SeatsGrid from './SeatsGrid';
import { Seat } from '../../types/SeatType';
import { Movie } from '../../types/MovieType';
import { ClipLoader } from 'react-spinners';
import ErrorComponent from '../error/ErrorComponent';


type Props = {}



const SessionDetails = (props: Props) => {
  const [buySteps, setBuysteps] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cartão de débito');
  const [postTickets, { isLoading: isPostingTickets, error: postTicketsError, data: postTicketsData }] = usePostTicketsMutation();
  const { movieTitle, sessionId } = useParams<{ movieTitle: string, sessionId: string }>();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [takenSeats, setTakenSeats] = useState<Seat[]>([]);
  const { data: movie, error, isLoading } = useGetMovieSessionByDateQuery({ movieTitle, sessionId });
  const [countdown, setCountdown] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null) {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else if (postTicketsError){
        navigate("/sessoes")
      }else if (error){
        navigate("/")
      } 
      else {
        window.location.reload();
      }
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (error || postTicketsError) {
      setCountdown(3);
    }
  }, [error, postTicketsError])


  const handlePostTickets = async () => {

    if (buySteps < 3) {
      setBuysteps(buySteps + 1)
    }
    if (buySteps === 2) {
      try {
        const tickets = selectedSeats.map(seat => ({ seat }))
        await postTickets({ sessionId, tickets }).unwrap();

      } catch (err) {
        console.error('Failed to create tickets: ', err);
      }
      setCountdown(3)
    }
  };


  useEffect(() => {
    if (movie) {
      const loadedTakenSeats = movie.sessions[0].tickets?.map(ticket => {
        const seat: Seat = { row: ticket.seat.row, column: ticket.seat.column, price: 30, seatType: ticket.seat.type }
        return seat
      })
      if (loadedTakenSeats) {
        setTakenSeats(loadedTakenSeats)
      }
    }
  }, [movie])


  if (isLoading) return <div className='min-h-[600px] flex items-center justify-center mt-16 p-4 bg-[#3f546e] '><ClipLoader size={50} color='blue' /></div>;
  if (error) {
    console.log(error)
    return (
      <div className="bg-[#3f546e] flex items-center justify-center h-screen w-full">
        <div className='border-8 rounded-md w-1/2 border-amber-900 flex items-center justify-center bg-[#3b424d] text-3xl flex-wrap font-bold text-white '>
          <ErrorComponent errorMessage={(error as any).data.message} />
          <p className='w-full mb-8 text-center'>Voltando a página principal em {countdown}...</p>
        </div>
      </div>)
  }

  if (!movie) return <p>Movie not found</p>;



  const handleSelectChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedSeats = [...selectedSeats];
    const selectedSeat = newSelectedSeats[index];

    selectedSeat.seatType = event.target.value as 'MEIA' | 'INTEIRA';
    selectedSeat.price = event.target.value === 'MEIA' ? selectedSeat.price / 2 : selectedSeat.price * 2;

    newSelectedSeats[index] = selectedSeat;
    setSelectedSeats(newSelectedSeats);
  };

  const renderSeatsGrid = () => {
    return (
      <div className=' rounded-lg w-full flex-col ml-4 justify-between flex h-[600px] p-4 bg-[#111827]'>
        <SeatsGrid selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}
          takenSeats={takenSeats}
        />
        <div className='border-b-4 rounded-t-xl text-center text-white text-xl font-bold bg-[#666a6f] '>
          TELA
        </div>
      </div>
    )
  }

  const ListItem: React.FC<{ selectedSeat: Seat, index: number }> = ({ selectedSeat, index }) => {
    return (
      <li className='flex text-white justify-evenly text-lg items-center mb-2 p-2 rounded-lg bg-[#3b424d]'>
        <div className='flex justify-center items-center gap-5'>
          <img className='w-16 h-16' src={ingressoWebp} />
          <p className=' text-gray-200 font-semibold'>Assento: {selectedSeat.row + selectedSeat.column}</p>

        </div>
        <div className='after:flex  after:duration-200 after:ease-linear after:transition-all hover:after:text-orange-700 after:items-center after:left-[75%] after:justify-center after:pointer-events-none after:absolute  after:h-10 after:w-10 after:bg-[#3f4c68] after:content-["\25BC"] flex relative items-center text-white justify-center w-40 h-10 overflow-hidden rounded-md '>
          <select
            className='w-full pl-4 appearance-none bg-[#111827] h-10'
            value={selectedSeat.seatType} onChange={(event) => handleSelectChange(index, event)}>
            <option value="INTEIRA">Inteira</option>
            <option value="MEIA">Meia</option>
          </select>
        </div>
        <span className='flex font-semibold text-gray-200 items-center justify-center 
        h-8 w-32'>
          Preço: R$ {selectedSeat.price},00
        </span>
      </li>
    );
  };

  const renderTicketTypes = () => {
    return (
      <div className='hide-scrollbar rounded-lg w-full flex-col ml-4 overflow-scroll flex h-[600px] p-4 bg-[#111827]'>
        <span className='text-base font-semibold text-red-500'>Os ingressos meia-entrada requerem apresentação de documento.</span>
        <ul>
          {selectedSeats.map((selectedSeat, index) =>
            <ListItem selectedSeat={selectedSeat} index={index} key={index} />)}
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
            {seats.map((seat, index) => <p key={index}>{seat.row + seat.column}</p>)}
          </div>
        </div>
        <div className='border-t mt-auto gap-1 text-lg flex flex-col'>
          <span className='flex justify-between'>
            Itens <p>{seats.length}</p>
          </span>
          <span className='font-bold  flex justify-between'>Total:
            <p> R$ {seats.reduce((total, seat) => total + seat.price, 0)},00</p></span>
        </div>
        <div className='mt-10 gap-1 text-lg flex'>

          <button
            disabled={buySteps <= 0 || buySteps === 3}
            className={`bg-blue-600  w-1/2 font-bold text-xl h-9 disabled:bg-gray-400  rounded-xl shadow-md active:bg-blue-800`}

            onClick={() => buySteps > 0 ? setBuysteps(buySteps - 1) : ''}>VOLTAR</button>

          <button
            disabled={selectedSeats.length <= 0 || buySteps > 2}
            className='bg-blue-600 disabled:bg-gray-400 w-1/2 font-bold text-xl h-9 rounded-xl active:bg-blue-800 shadow-md' onClick={handlePostTickets}>{buySteps >= 2 ? 'COMPRAR' : 'CONTINUAR'}</button>
        </div>
      </div>
    )
  }

  const renderTicketConfirmation = () => {
    return (
      <div className='rounded-lg hide-scrollbar w-full flex-col ml-4 overflow-scroll flex h-[600px] p-4 bg-[#111827]'>
        <span className='text-base font-semibold text-red-500'>Confira o número de ingressos meia-entrada e inteira.</span>
        <ul>
          <li onClick={() => setPaymentMethod("Cartão de débito")}
            className={`flex ${paymentMethod === "Cartão de débito" ? "border border-blue-400" : ""} cursor-pointer text-white text-lg mb-2 p-2 items-center rounded-lg bg-[#3b424d]`}>
            <img className='w-16 h-12' src={debitCard} />
            <p className='p-2 ml-4 font-semibold'>Cartão de débito</p>
          </li>
          <li onClick={() => setPaymentMethod("Cartão de crédito")}
            className={`flex ${paymentMethod === "Cartão de crédito" ? "border border-blue-400" : ""} cursor-pointer text-white text-lg mb-2 p-2 items-center rounded-lg bg-[#3b424d]`}>
            <img className='w-16 h-12' src={debitCard} />
            <p className='p-2  ml-4 font-semibold'>Cartão de crédito</p>
          </li>
          <li onClick={() => setPaymentMethod("Pix")}
            className={`flex ${paymentMethod === "Pix" ? "border border-blue-400" : ""} cursor-pointer text-white text-lg mb-2 p-2 items-center rounded-lg bg-[#3b424d]`}>
            <img className='w-16 h-12' src={debitCard} />
            <p className='p-2 ml-4 font-semibold'>Pix</p>
          </li>
          <li onClick={() => setPaymentMethod("Google Pay")}
            className={`flex ${paymentMethod === "Google Pay" ? "border border-blue-400" : ""} cursor-pointer text-white text-lg mb-2 p-2 items-center rounded-lg bg-[#3b424d]`}>
            <img className='w-16 h-12' src={debitCard} />
            <p className='p-2 ml-4 font-semibold'>Google Pay</p>
          </li>
        </ul>
      </div>
    );
  };


  const renderPaymentConfirmation = () => {
    return (
      <div className='rounded-lg hide-scrollbar w-full flex-col ml-4 overflow-scroll flex h-[600px] p-4 bg-[#111827]'>

        {isPostingTickets ? <div className='flex h-full items-center justify-center'><ClipLoader size={60} color='blue' /></div> :
          <div className='border-8 rounded-md w-full h-1/3  border-amber-900 flex items-center justify-center text-3xl flex-wrap font-bold text-white bg-[#3f546e]'>
            <span className='w-full text-center'>{postTicketsError ? (postTicketsError as any).data.message : 'Compra concluida'}</span>
            <div className='w-full text-xl text-center'>Redirecionando em {countdown}...</div>
          </div>

        }

      </div>
    );
  };

  return (
    <section className='min-h-[600px] mt-16 p-4 bg-[#3f546e]' >
      {/*        <div className='flex h-32 w-4/5 mx-auto pb-6 z-10 px-8 justify-between items-end border-b-2'> </div>  */}
      <div className='flex pt-4 border-t-2 w-4/5 mx-auto'>
        {renderTicketSummary(movie, selectedSeats)}
        {buySteps === 0 ? renderSeatsGrid() : ''}
        {buySteps === 1 ? renderTicketTypes() : ''}
        {buySteps === 2 ? renderTicketConfirmation() : ''}
        {buySteps === 3 ? renderPaymentConfirmation() : ''}
      </div>

    </section >
  )
}

export default SessionDetails