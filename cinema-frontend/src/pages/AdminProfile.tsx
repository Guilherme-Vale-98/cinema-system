import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import EditProfileForm from '../components/forms/EditProfileForm';
import TicketHistory from '../components/ticket/TicketHistory';
import { ClipLoader } from 'react-spinners';
import { AdminMenuState } from '../types/MenuState';
import { useLazyCheckRolesQuery } from '../redux/services/users/authApi';
import { setUser } from '../redux/features/users/authSlice';


type Props = {}

const AdminProfile = (props: Props) => {
    const [menuState, setMenuState] = useState<string>(AdminMenuState.Initial);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const user = useAppSelector((state: RootState) => state.userState.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [triggerCheckRoles, { data: rolesData, error, isLoading, isSuccess }] = useLazyCheckRolesQuery();

    
    useEffect(() => {
      if (!user) {
        navigate('/conta');
        return
      }
      triggerCheckRoles({});
    }, [])

    useEffect(() => {
      if (rolesData) {
        dispatch(setUser(rolesData));
      }
      if(error){
        navigate('/')
      }
    }, [rolesData, error])
  
    if (user && isSuccess) {
  
      switch (menuState) {
        case AdminMenuState.EditProfile:
          return <EditProfileForm user={user} setMenuState={setMenuState}/>
        
        case AdminMenuState.AddAdmin:
          return <EditProfileForm user={user} setMenuState={setMenuState}/>
        case AdminMenuState.EditMovies:
          return <EditProfileForm user={user} setMenuState={setMenuState}/>

        case AdminMenuState.MovieStats:
          return <EditProfileForm user={user} setMenuState={setMenuState}/>
        
        case AdminMenuState.Initial:
          return (
            <div className='p-32 bg-[#3f546e] w-full '>
              <div className='border-8 p-4 bg-gray-900 rounded-md w-full border-amber-900  text-3xl flex-wrap font-bold text-white'>
                <div className='text-center'>Bem vindo, {user.username}!</div>
                <div className='w-full mt-5 p-5 gap-6 flex flex-col items-center'>
                  <button onClick={() => setMenuState(AdminMenuState.EditProfile)} className='bg-amber-500 w-1/4 text-gray-900 font-semibold py-1 px-3 rounded-md hover:bg-amber-600 text-2xl hover:text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50'>
                    {AdminMenuState.EditProfile}
                  </button>
                  <button onClick={() => setMenuState(AdminMenuState.AddAdmin)} className='bg-amber-500 w-1/4 text-gray-900 font-semibold py-1 px-3 rounded-md hover:bg-amber-600 text-2xl hover:text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50'>
                    {AdminMenuState.AddAdmin}
                  </button>
                  <button onClick={() => setMenuState(AdminMenuState.EditMovies)} className='bg-amber-500 w-1/4 text-gray-900 font-semibold py-1 px-3 rounded-md hover:bg-amber-600 text-2xl hover:text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50'>
                    {AdminMenuState.EditMovies}
                  </button>
                  <button onClick={() => setMenuState(AdminMenuState.MovieStats)} className='bg-amber-500 w-1/4 text-gray-900 font-semibold py-1 px-3 rounded-md hover:bg-amber-600 text-2xl hover:text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50'>
                    {AdminMenuState.MovieStats}
                  </button>
                </div>
              </div>
            </div>
          )
      }
  
    }
  
  
    return (
      <div className='bg-[#3f546e] flex items-center justify-center h-screen w-full'>
        <ClipLoader size={100} color='black' />
      </div>)
  }
  


export default AdminProfile