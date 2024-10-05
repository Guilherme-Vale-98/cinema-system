import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { RootState } from '../redux/store'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLazyCheckRolesQuery } from '../redux/services/users/authApi'
import { setUser } from '../redux/features/users/authSlice'
import { ClipLoader } from 'react-spinners'
import ErrorComponent from '../components/error/ErrorComponent'

type Props = {}


enum MenuState {
  Initial = "initial",
  EditProfile = "editProfile",
  TicketHistory = "ticketHistory",
  PaymentMethods = "paymentMethods",
}


const Profile = (props: Props) => {
  const [menuState, setMenuState] = useState<string>(MenuState.Initial);

  const user = useAppSelector((state: RootState) => state.userState.user);
  const navigate = useNavigate();
  const [triggerCheckRoles, { data: rolesData, error, isLoading, isSuccess }] = useLazyCheckRolesQuery();
  const dispatch = useAppDispatch();

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
  }, [rolesData])

  
  if (user && isSuccess ) {
    switch(menuState){
      case MenuState.EditProfile:
        return (<div className='p-32 bg-[#3f546e] w-full '>
          <div className='border-8 p-4 bg-gray-900 rounded-md w-full border-amber-900  text-3xl flex-wrap font-bold text-white'>
            <div className='text-center'>Editando perfil, {user.username}</div>
          </div>
        </div>)
      case MenuState.TicketHistory:
        return (<div className='p-32 bg-[#3f546e] w-full '>
          <div className='border-8 p-4 bg-gray-900 rounded-md w-full border-amber-900  text-3xl flex-wrap font-bold text-white'>
            <div className='text-center'>Ticket History, {user.username}</div>
          </div>
        </div>)
      case MenuState.PaymentMethods:
        return (<div className='p-32 bg-[#3f546e] w-full '>
          <div className='border-8 p-4 bg-gray-900 rounded-md w-full border-amber-900  text-3xl flex-wrap font-bold text-white'>
            <div className='text-center'>Payment Methods, {user.username}</div>
          </div>
        </div>)

      case MenuState.Initial:
        return (
          <div className='p-32 bg-[#3f546e] w-full '>
            <div className='border-8 p-4 bg-gray-900 rounded-md w-full border-amber-900  text-3xl flex-wrap font-bold text-white'>
              <div className='text-center'>Bem vindo, {user.username}!</div>
              <div className='w-full mt-5 p-5 gap-6 flex flex-col items-center'>
                <button onClick={()=> setMenuState(MenuState.EditProfile)} className='bg-amber-500 w-1/4 text-gray-900 font-semibold py-1 px-3 rounded-md hover:bg-amber-600 text-2xl hover:text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50'>
                  Editar conta
                </button>
                <button onClick={()=> setMenuState(MenuState.TicketHistory)} className='bg-amber-500 w-1/4 text-gray-900 font-semibold py-1 px-3 rounded-md hover:bg-amber-600 text-2xl hover:text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50'>Histórico de ingressos</button>
                <button onClick={() => setMenuState(MenuState.PaymentMethods)} className='bg-amber-500 w-1/4 text-gray-900 font-semibold py-1 px-3 rounded-md hover:bg-amber-600 text-2xl hover:text-white transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50'>Métodos de pagamento</button>
              </div>
            </div>
          </div>
        )
    }
    
  }


  if (error) {
    console.log(error)
    return (<div className=" flex items-center justify-center h-screen w-full">
      <ErrorComponent errorMessage={(error as any).data} />
    </div>)
  }

  return (
    <div className='bg-[#3f546e] flex items-center justify-center h-screen w-full'>
      <ClipLoader size={100} color='black' />
    </div>)
}

export default Profile
