import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Credentials, useLoginMutation } from '../redux/services/users/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/users/authSlice';
import { User } from '../types/UserType';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { Err } from '../types/ErrorType';



type Props = {}



const Account = (props: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState<Err | null>();
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (formData: any) => {
        const credential: Credentials = { username: formData.user, password: formData.password }
        try {
            const result: User = await login(credential).unwrap()
            if (result) {
                setError(null);
                dispatch(setUser(result));
                navigate("/");
            }
        } catch (err) {
            if ((err as Err).status === 401) {
                setError({ status: (err as Err).status, message: 'usuário ou senha inválidos' })
            }else{
                setError({ status: 500, message: 'Um erro inesperado ocorreu' });
            }
        }
    };

    return (
        <div className='p-32 bg-[#3f546e] w-full '>
            {error && <div className='border-8 mb-4 bg-gray-900 p-4 rounded-md w-full border-amber-900 flex items-center justify-between text-3xl flex-wrap font-bold text-red-600'>
                erro: {error.message} 
            </div>}
            <div className='border-8 bg-gray-900 p-16 rounded-md w-full border-amber-900 flex items-center justify-between text-3xl flex-wrap font-bold text-white'>
                <div className=''>
                    <h1 className='text-center'>Entre com sua conta</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-6'>
                        <div>
                            <label className='block text-lg mb-2'>Usuário:</label>
                            <input
                                type="text"
                                {...register('user', { required: 'Insira o nome de usuário.' })}
                                className='w-full p-2 rounded-md text-black'
                            />
                            {errors.user && <p className='text-red-500 mt-2'>{errors.user.message as string}</p>}
                        </div>
                        <div>
                            <label className='block text-lg mb-2'>Senha:</label>
                            <input
                                type="password"
                                {...register('password', { required: 'Insira sua senha.' })}
                                className='w-full p-2 rounded-md text-black'
                            />
                            {errors.password && <p className='text-red-500 mt-2'>{errors.password.message as string}</p>}
                        </div>

                        <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'>
                            Login
                        </button>
                    </form>

                </div>


                <div className='border border-red-400'>Register</div>
            </div>
        </div>
    )
}

export default Account