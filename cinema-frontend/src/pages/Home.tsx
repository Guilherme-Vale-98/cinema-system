import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Carrousel from '../components/carrousel/Carrousel'

type Props = {}

const Home = (props: Props) => {
  return (
    <div className='w-full pt-[68px]'>
          <Carrousel/>

    </div>
  )
}

export default Home