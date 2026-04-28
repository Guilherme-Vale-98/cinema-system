import { motion, useAnimate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import MovieCard from '../movies/MovieCard';
import ErrorComponent from '../error/ErrorComponent';
import './CarrouselStyle.css'
import { useGetFeaturedMoviesQuery } from '../../redux/services/api/cinemaApi';
import { Movie } from '../../types/MovieType';

type SlideDirection = "next" | "prev";

const waitForNextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const getReorderedMovies = (movies: Movie[], direction: SlideDirection) => {
    if (movies.length <= 1) {
        return movies;
    }

    if (direction === "next") {
        const [firstMovie, ...remainingMovies] = movies;
        return firstMovie ? [...remainingMovies, firstMovie] : movies;
    }

    const lastMovie = movies[movies.length - 1];
    return lastMovie ? [lastMovie, ...movies.slice(0, -1)] : movies;
}

const Carrousel = () => {
    const [movieListSlice, setMovieListSlice] = useState<Movie[]>([]);
    const [moviesView, setMovieView] = useState('Em cartaz');
    const [isAnimating, setIsAnimating] = useState(false);
    const isAnimatingRef = useRef(false);
    const [scope, animate] = useAnimate();

    const { data: movies, error, isLoading } = useGetFeaturedMoviesQuery({});

    useEffect(() => {
        if (movies) {
            setMovieListSlice(movies);
        }
    }, [movies])

    const handleCartaz = () => {
        setMovieView('Em cartaz')
    }

    const getSlideDistance = () => {
        const track = scope.current as HTMLElement | null;
        const firstCard = track?.children[0] as HTMLElement | undefined;
        const secondCard = track?.children[1] as HTMLElement | undefined;

        if (firstCard && secondCard) {
            return secondCard.offsetLeft - firstCard.offsetLeft;
        }

        return firstCard?.offsetWidth ?? 368;
    };

    const animateCarousel = async (direction: SlideDirection) => {
        if (isAnimatingRef.current || movieListSlice.length <= 1) {
            return;
        }

        isAnimatingRef.current = true;
        setIsAnimating(true);

        const slideDistance = getSlideDistance();

        try {
            if (direction === "next") {
                if (scope.current) {
                    await animate(scope.current, { x: -slideDistance, opacity: 0.92 }, { duration: 0.34, ease: "easeInOut" });
                }

                flushSync(() => {
                    setMovieListSlice((prevList) => getReorderedMovies(prevList, "next"));
                });

                if (scope.current) {
                    await animate(scope.current, { x: 0, opacity: 1 }, { duration: 0 });
                }
            } else {
                flushSync(() => {
                    setMovieListSlice((prevList) => getReorderedMovies(prevList, "prev"));
                });

                if (scope.current) {
                    await animate(scope.current, { x: -slideDistance, opacity: 0.92 }, { duration: 0 });
                    await waitForNextFrame();
                    await animate(scope.current, { x: 0, opacity: 1 }, { duration: 0.34, ease: "easeInOut" });
                }
            }
        } finally {
            isAnimatingRef.current = false;
            setIsAnimating(false);
        }
    };

    const handleNextSlide = () => {
        animateCarousel("next");
    };

    const handlePrevSlide = () => {
        animateCarousel("prev");
    };

    const activeMovieIndex = Math.min(2, movieListSlice.length - 1);
    const activeMovie = activeMovieIndex >= 0 ? movieListSlice[activeMovieIndex] : undefined;

    if (isLoading) return (
        <section className='flex min-h-[500px] items-center justify-center text-white mobile-section flex-wrap relative w-full bg-[#3f546e]'>
            <ClipLoader size={70} color='blue' />
        </section>
    );
    if (error) return (
        <section className='flex min-h-[500px] items-center justify-center text-white mobile-section flex-wrap relative w-full bg-[#3f546e]'>
            <div className='rounded-md border-8 border-amber-900 bg-gray-900 p-8 text-3xl font-bold text-white'>
                <ErrorComponent errorMessage='Nao foi possivel exibir os filmes em destaque.' />
            </div>
        </section>
    );

    if (movieListSlice.length === 0) {
        return (
            <section className='flex min-h-[500px] items-center justify-center text-white mobile-section flex-wrap relative w-full bg-[#3f546e]'>
                <div className='text-3xl font-bold'>Nenhum filme em destaque</div>
            </section>
        )
    }

    return (
        <section className='flex text-white mobile-section flex-wrap relative w-full' style={{
            backgroundImage: `url(${activeMovie?.posterPath || ""})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',

        }}>
            <div className='absolute w-full h-full sec'></div>
            <div className='flex h-32 w-4/5 mx-auto pb-6 z-10 px-8 justify-between items-end border-b-2'>
                <h2 className='text-6xl font-bold'>Filmes em destaque</h2>
                <div className='flex font-semibold gap-10'>
                    <span onClick={handleCartaz} className={`text-2xl cursor-pointer border border-transparent ${moviesView === 'Em cartaz' ? "border-b-white" : ''}`}> Em cartaz </span>
                </div>
            </div>
            <div className="relative md:w-full my-[2rem] p-6 overflow-x-hidden">
                <motion.div ref={scope} className="flex md:gap-[3rem] md:relative left-[-170px] " >
                    {movieListSlice.map((movie) =>
                        <div className='flex flex-col items-center' key={movie.id}>
                            <MovieCard movie={movie} />
                            <Link
                                to='/sessoes'
                                className="bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 w-[60%] focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center me-2 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Comprar ingresso
                            </Link>
                        </div>
                    )}
                </motion.div>

                <div className="navigation-buttons">
                    <button disabled={isAnimating || movieListSlice.length <= 1} className='w-12 h-12 disabled:opacity-40' onClick={handlePrevSlide}><FaArrowLeft className='w-12 h-12 bg-black opacity-65' /></button>
                    <button disabled={isAnimating || movieListSlice.length <= 1} className='w-12 h-12 disabled:opacity-40' onClick={handleNextSlide}><FaArrowRight className='w-12 h-12 bg-black opacity-65' /></button>
                </div>
            </div>
        </section>
    )
}

export default Carrousel
