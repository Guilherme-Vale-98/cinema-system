import React, { useEffect, useState } from 'react'
import ListSectionItem from './ListSectionItem';

type Props = {}

const ListSection = (props: Props) => {
  const [weekdays, setWeekdays] = useState<Date[]>();
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const [selectedDate, setSelectedDate] = useState<Date>();


  useEffect(() => {
    getdaysDate();
  }, [])

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


  console.log(selectedDate)
  return (
    <section className='flex text-white bg-[#3f546e]  flex-wrap relative w-full'
    >
      <div className='flex h-32 w-full md:w-4/5 md:mx-auto pb-3 px-8 justify-between items-end border-b-2'>
        <div className='flex font-semibold gap-10'>
          <span className='text-3xl border border-transparent hover:border-b-white'>
            Sessões
          </span>
          <span className='text-3xl hover:border-b '> Detalhes </span>
        </div>
      </div>
      <div className='md:w-4/5 md:mx-auto w-full rounded-lg overflow-scroll md:overflow-auto bg-gray-800 my-10 mds:rounded-xl'>
        <ul className='flex mx-8 justify-between'>
          {weekdays?.map((e) => (
            <li className='m-2 w-[80px] cursor-pointer' onClick={() => setSelectedDate(e)}>
              <div className={selectedDate == e ? "text-3xl" : "text-2xl text-gray-500"}>
                {e.toLocaleDateString('pt-BR').slice(0, 5)}
                <br />
                {e.getDay() === new Date().getDay() ? "Hoje" : dayNames[e.getDay()]}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ul className=' w-4/5 mx-auto'>
        <ListSectionItem/>
        <ListSectionItem/>
      </ul>
      

    </section>
  )
}

export default ListSection