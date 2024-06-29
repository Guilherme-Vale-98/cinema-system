import Hero from '../components/Hero/Hero'
import Carrousel from '../components/carrousel/Carrousel'


const Home = () => {
  return (
    <div className='w-full mt-16'>
          <Carrousel/>
          <Hero></Hero>
    </div>
  )
}

export default Home