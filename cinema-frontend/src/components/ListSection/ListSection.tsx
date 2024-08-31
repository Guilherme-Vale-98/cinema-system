import React, { CSSProperties, useEffect, useState } from 'react'
import ListSectionItem from './ListSectionItem';
import { useGetMoviesByDateQuery } from '../../redux/services/api/cinemaApi';
import { ApiError, Session } from '../../types/SessionType';
import { Movie } from '../../types/MovieType';
import { ClipLoader } from 'react-spinners';
import ErrorComponent from '../error/ErrorComponent';

type Props = {}


const ListSection = (props: Props) => {
  const [weekdays, setWeekdays] = useState<Date[]>();
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const [selectedDate, setSelectedDate] = useState<Date>();

  const formatDate = (date: Date | undefined) => {
    const formatedDate = date?.toLocaleDateString('pt-br').replace(/\//g, "-");
    return formatedDate;
  }

  const formatedDate = formatDate(selectedDate);
  const getdaysDate = () => {
    const dates = [];
    for (let index = 0; index < 7; index++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + index)
      dates.push(currentDate);
    }
    setWeekdays(dates);
    setSelectedDate(dates[0]);
  }
  useEffect(() => {
    getdaysDate();
  }, [])


  const { data: movies, error, isLoading } = useGetMoviesByDateQuery(formatedDate ?? '', {
    skip: !selectedDate,
  })

  return (
    <section className='flex text-white bg-[#3f546e]  flex-wrap relative w-full'
    >
      <div className='flex h-32 w-full md:w-4/5 md:mx-auto pb-3 px-8 justify-between items-end border-b-2'>
        <div className='flex font-semibold gap-10'>
          <span className='text-3xl border border-transparent hover:border-b-white'>
            Sessões
          </span>
        </div>
      </div>
      <div className='md:w-4/5 md:mx-auto w-full rounded-lg overflow-scroll md:overflow-auto bg-gray-800 my-10 mds:rounded-xl'>
        <ul className='flex mx-8 justify-between'>
          {weekdays?.map((e, index) => (
            <li className='m-2 w-[80px] cursor-pointer' key={index} onClick={() => setSelectedDate(e)}>
              <div className={selectedDate == e ? "text-3xl" : "text-2xl text-gray-500"}>
                {e.toLocaleDateString('pt-BR').slice(0, 5)}
                <br />
                {e.getDay() === new Date().getDay() ? "Hoje" : dayNames[e.getDay()]}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul className='w-4/5 mx-auto min-h-[400px]'>
        {isLoading && <div className=' w-8 m-auto'>
          <ClipLoader />
        </div>}
        {error && 'data' in error && <p>{(error.data as ApiError).message}</p>}
        {(movies && movies.length) === 0 && <div className="bg-[#3f546e] flex items-center justify-start w-full">
          <div className='border-8 rounded-md w-1/2 border-amber-900 flex items-center justify-center bg-[#3b424d] text-3xl flex-wrap font-bold text-white '>
            <ErrorComponent errorMessage="Nenhum filme nesta data" />
          </div>
        </div>}
        {movies && movies.map((movie: Movie, index: number) => <ListSectionItem movie={movie} key={index} />)}
      </ul>
    </section>
  )
}

export default ListSection