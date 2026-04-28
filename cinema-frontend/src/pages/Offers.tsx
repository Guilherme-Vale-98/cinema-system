import { Link } from 'react-router-dom'
import constructionImage from '../assets/construction.png'

const Offers = () => {
  return (
    <section className='min-h-[650px] mt-16 bg-[#3f546e] px-6 py-20 text-white'>
      <div className='mx-auto flex max-w-5xl flex-col items-center gap-8 rounded-md border-8 border-amber-900 bg-gray-900 p-10 text-center'>
        <img
          src={constructionImage}
          alt=''
          className='h-40 w-40 object-contain'
        />
        <div>
          <h1 className='text-4xl font-bold'>Promocoes em breve</h1>
          <p className='mt-4 max-w-2xl text-xl font-semibold text-gray-300'>
            Estamos preparando ofertas especiais para ingressos, combos e sessoes selecionadas.
          </p>
        </div>
        <Link
          to='/sessoes'
          className='rounded-md bg-amber-500 px-6 py-3 text-xl font-bold text-gray-900 hover:bg-amber-600 hover:text-white'
        >
          Ver sessoes
        </Link>
      </div>
    </section>
  )
}

export default Offers
