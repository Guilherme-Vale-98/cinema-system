import React, { useState } from 'react'
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';



type Props = {}



const Account = (props: Props) => {
    const [activeAuthAction, setActiveAuthAction] = useState<'login' | 'register' | null>(null);

    return (
        <div className='p-32 bg-[#3f546e] w-full '>
            <div className='border-8 h-[750px] bg-gray-900 p-16 rounded-md w-full border-amber-900 flex items-center justify-between text-3xl flex-wrap font-bold text-white'>
                <LoginForm activeAuthAction={activeAuthAction} setActiveAuthAction={setActiveAuthAction}/>
                <RegisterForm activeAuthAction={activeAuthAction} setActiveAuthAction={setActiveAuthAction}/>
            </div>
        </div>
    )
}

export default Account
