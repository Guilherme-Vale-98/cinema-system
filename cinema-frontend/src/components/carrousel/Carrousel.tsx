import { motion, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import MovieCard from '../movies/MovieCard';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './CarrouselStyle.css'
import { useGetFeaturedMoviesQuery } from '../../redux/services/api/cinemaApi';
import { Movie } from '../../types/MovieType';

type Props = {}

const Carrousel = (props: Props) => {
    const [movieListSlice, setMovieListSlice] = useState<Movie[]>([]);
    const [moviesView, setMovieView] = useState('Em cartaz');

    const {data:movies, error, isLoading} = useGetFeaturedMoviesQuery({});

    useEffect(()=>{
        if (movies) {
            setMovieListSlice(movies);
        }
    }, [movies])
    const handleCartaz = () => {
        setMovieView('Em cartaz')
    }
    const handleEmBreve = () => {
        setMovieView('Em breve')
    }

    
    const handleNextSlide = () => {
        setMovieListSlice((prevList) => {
            const newList = [...prevList];
            const firstMovie = newList.shift();
            newList.push(firstMovie!);
            return newList;
        });

    };

    const handlePrevSlide = () => {
        setMovieListSlice((prevList) => {
            const newList = [...prevList];
            const lastMovie = newList.pop();
            return [lastMovie!,...newList];
        });
    };
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading movies</div>;
    return (
        <section className='flex text-white mobile-section flex-wrap relative w-full' style={{
            backgroundImage: `url(${movieListSlice[2]?.posterPath || ""})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        
        }}>        
            <div className='absolute w-full h-full sec'></div>
            <div className='flex h-32 w-4/5 mx-auto pb-6 z-10 px-8 justify-between items-end border-b-2'>
                <h2 className='text-6xl font-bold'>Filmes em destaque</h2>
                <div className='flex font-semibold gap-10'>
                    <span onClick={handleCartaz} className={`text-2xl cursor-pointer border border-transparent ${moviesView === 'Em cartaz'? "border-b-white": ''}`}> Em cartaz </span>
                    <span onClick={handleEmBreve} className={ `${moviesView === 'Em breve'? "border-b ": ''} cursor-pointer text-2xl`}> Em breve </span>
            </div>
            </div>
            <div className="relative md:w-full my-[2rem] p-6 overflow-x-hidden">
                <motion.div className="flex md:gap-[3rem] md:relative left-[-170px] " >
                    {movieListSlice.map((movie, index) =>
                        <div className='flex flex-col items-center' key={index}>
                            <MovieCard movie={movie} />
                            <button type="button" className="bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 w-[60%] focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center me-2 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Comprar ingresso</button>
                        </div>
                    )}
                </motion.div>
                
                <div className="navigation-buttons">
                    <button className='w-12 h-12' onClick={handlePrevSlide}><FaArrowLeft className='w-12 h-12 bg-black opacity-65' /></button>
                    <button className='w-12 h-12' onClick={handleNextSlide}><FaArrowRight className='w-12 h-12 bg-black opacity-65' /></button>
                </div>
            </div>
        </section>
    )
}

export default Carrousel