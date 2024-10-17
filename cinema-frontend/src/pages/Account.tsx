import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Credentials, useLoginMutation } from '../redux/services/users/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/users/authSlice';
import { User } from '../types/UserType';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { Err } from '../types/ErrorType';
import LoginForm from '../components/forms/LoginForm';



type Props = {}



const Account = (props: Props) => {

    return (
        <div className='p-32 bg-[#3f546e] w-full '>
            <div className='border-8 h-[550px] bg-gray-900 p-16 rounded-md w-full border-amber-900 flex items-center justify-between text-3xl flex-wrap font-bold text-white'>
                <LoginForm/>
                <div className='border border-red-400'>Register</div>
            </div>
        </div>
    )
}

export default Account