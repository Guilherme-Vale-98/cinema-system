import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { RootState } from '../redux/store'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLazyCheckRolesQuery } from '../redux/services/users/authApi'
import { setUser } from '../redux/features/users/authSlice'
import { ClipLoader } from 'react-spinners'
import ErrorComponent from '../components/error/ErrorComponent'

type Props = {}

const Profile = (props: Props) => {
  const user = useAppSelector((state: RootState) => state.userState.user);
  const navigate = useNavigate();
  const [triggerCheckRoles, { data: rolesData, error, isLoading, isSuccess }] = useLazyCheckRolesQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/conta")
    }
    triggerCheckRoles({})
    if(error){
      console.log(error)
      return
    }
    if (rolesData) {
      dispatch(setUser(rolesData))
    }

  }, [user, rolesData])

  if (isSuccess) {
    return (<div className='mt-[88px] h-[1000px] text-4xl'>Bem vindo, {user?.username}! you are a {user?.roles[0]}
      {user?.roles[0] == "ROLE_ADMIN" ? <div>ADMIN ONLY ELEMENTS</div> : ""}
    </div>)
  }
  if(error){
   console.log(error)
   return (<div className=" flex items-center justify-center h-screen w-full">
     <ErrorComponent errorMessage={(error as any).data}/>
   </div>)
  }

  return (<div className=' flex items-center justify-center h-screen w-full'>
    <ClipLoader size={150} />
  </div>)
}

export default Profile