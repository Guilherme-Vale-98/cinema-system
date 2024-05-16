import Hero from '../components/Hero/Hero'
import Carrousel from '../components/carrousel/Carrousel'


const Home = () => {
  return (
    <div className='w-full pt-[68px]'>
          <Carrousel/>
          <Hero></Hero>
    </div>
  )
}

export default Home