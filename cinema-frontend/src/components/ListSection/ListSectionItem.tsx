import React, { useState } from 'react'
import { CiDollar } from 'react-icons/ci'
import SessionsButton from './SessionsButton'
import { Movie } from '../../types/MovieType'
import Modal from 'react-modal';
import { FaCirclePlay } from "react-icons/fa6";
import ClipLoader from 'react-spinners/ClipLoader';

type Props = {
  movie: Movie
}

const ListSectionItem = ({ movie }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const customStyles = {
    content: {
      width: '600px',
      height: '400px',
      margin: 'auto',
      padding: '20px',
      borderRadius: '10px',
      background: '#111827',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false)
    setIsLoading(true)
    return 
  };
  const handleIframeLoad = () => setIsLoading(false);
  console.log(movie)
  return (
    <li className='bg-gray-800 shadow-lg flex flex-wrap rounded-lg gap-4 mb-10 p-6'
    >
      <div className='relative flex justify-center items-center group'>
        <img src={movie.posterPath} className='w-[187px] rounded-md h-[275px] object-fill' />
        <button className='absolute hover:bg-red-600 transition-all ease-in-out opacity-0 group-hover:opacity-100 duration-300 bg-black rounded-full' onClick={openModal}> <FaCirclePlay className='w-16 h-16 text-blue-900' /></button>
      </div>
      <div className='w-[900px]'>
        <div className='font-semibold flex flex-wrap justify-between text-4xl'>
          <span>{movie.title}</span>
          <div className='font-normal text-xl flex  items-center'>
            <CiDollar className='w-8 h-8 mt-1' />Preços
          </div>
          <span className='text-xl border-b-2 w-full py-6'>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</span>
        </div>
        <div className='mt-5 flex gap-3 flex-wrap'>
          <span className='text-lg w-full'>Horários:</span>
          {movie.sessions?.map((session, index) =>
            <SessionsButton key={index} movieTitle={movie.title} startTime={session.startTime}
              sessionId={session.id} />
          )}
        </div>
        
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Trailer Modal"
        style={customStyles}
      >
        <button onClick={closeModal} className="absolute top-0 text-4xl right-4 text-gray-400">x</button>
        <div className="video-container flex justify-center items-center h-full">

          {isLoading && <ClipLoader color={"#ffffff"} size={50} />}
          <iframe className={`w-full h-full ${isLoading ? 'hidden' : ''}`} src={movie.trailerPath} title={movie.title + " Trailer"} frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
            onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </Modal>
    </li>
  )
}

export default ListSectionItem


