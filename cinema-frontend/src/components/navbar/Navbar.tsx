import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { FaCross, FaUser, FaX } from 'react-icons/fa6';
import { FaDoorOpen } from 'react-icons/fa';
import { logout } from '../../redux/features/users/authSlice';


type Props = {}

const Navbar = (props: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isUserLoggedIn = useAppSelector((state: RootState) => state.userState.user) ? true : false;

    const logOut = () => {
        dispatch(logout());
        navigate("/conta")
    }


    return (
        <nav className="bg-white dark:bg-gray-900 fixed h-[88px] w-full z-30 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto text-xl p-4">
                <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">CINEMASYS</span>
                </NavLink>
                <div className="flex md:order-2 space-x-3 gap-4 h-[56px] w-[140px] items-center justify-center md:space-x-0 rtl:space-x-reverse">
                    {isUserLoggedIn ?
                        (<>
                            <NavLink className="flex justify-center items-center" to="/perfil">
                                <div className='text-white flex justify-center items-center bg-blue-500 rounded-full w-10 h-10'>
                                    <FaUser className='text-2xl' />
                                </div>
                            </NavLink>
                            <div onClick={() => logOut()} className='text-white flex justify-center cursor-pointer items-center bg-red-600 rounded-full w-10 h-10'>
                                <FaDoorOpen className='text-2xl' />
                            </div>
                        </>)  : 
                        
                        (<NavLink to="/conta">
                            <button type="button" className="text-white  max-w-[140px] text-base focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg px-2 py-1 text-left dark:focus:ring-blue-800">
                                Entre ou Cadastre-se
                            </button>
                        </NavLink>)
                        
                        }
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink to="/" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ?
                                    "block py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"

                                    : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            }>Início</NavLink>
                        </li>
                        <li>
                            <NavLink to="/sessoes" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ?
                                    "block py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"

                                    : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            }>Sessões</NavLink>
                        </li>
                        <li>
                            <NavLink to="/promocoes" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ?
                                    "block py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"

                                    : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            }>Promoções</NavLink>
                        </li>
                        <li>
                            <NavLink to="/sobre" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ?
                                    "block py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"

                                    : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            }>Sobre nós</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar