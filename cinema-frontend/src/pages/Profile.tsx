import React, { useEffect } from 'react'
import { useAppSelector } from '../redux/hooks'
import { RootState } from '../redux/store'
import { Navigate, useNavigate } from 'react-router-dom'

type Props = {}

const Profile = (props: Props) => {
    const user = useAppSelector((state: RootState) => state.userState.user);
    const navigate = useNavigate();

    useEffect(()=>{
      if (!user){
      navigate("/conta");
    } 
    }, [])

  return (
    <div className='mt-[88px] h-[1000px] text-4xl'>Bem vindo, {user?.username}! you are a {user?.roles[0]}</div>
  )
}

export default Profile