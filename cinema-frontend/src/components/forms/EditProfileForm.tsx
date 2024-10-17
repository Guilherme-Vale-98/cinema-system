import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLoginMutation, useUpdateUserMutation } from '../../redux/services/users/authApi';
import { User } from '../../types/UserType';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/features/users/authSlice';
import { MenuState } from '../../pages/Profile';

type Props = {
    user: User,
    setMenuState: React.Dispatch<React.SetStateAction<string>>
}
export type UserUpdateInfo = {
    id: number,
    username: string,
    email: string,
    password: string
}
const EditProfileForm = ({ user, setMenuState }: Props) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [updateUser] = useUpdateUserMutation();
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const password = watch("password");

    const onSubmit = async (formData: any) => {
        const userInfo: UserUpdateInfo = { id: user.id, username: formData.user, email: formData.email, password: formData.password }
        try {
            const updateResult = await updateUser(userInfo).unwrap();
            const loginResult: User = await login({ username: formData.user, password: formData.password }).unwrap()
            if (updateResult && loginResult) {
                dispatch(setUser(loginResult));
                setMenuState(MenuState.Initial);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='p-32 bg-[#3f546e] w-full '>
            <div className='border-8 py-16 bg-gray-900 rounded-md w-full border-amber-900  text-3xl font-bold text-white'>
                <div className='text-center'>Editando seu perfil</div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex mx-auto w-1/2 flex-col space-y-6'>
                    <div>
                        <label className='block text-lg mb-2'>Usuário:</label>
                        <input
                            type="text"
                            defaultValue={user.username}
                            {...register('user', {
                                required: 'Insira o nome de usuário.',
                                maxLength: {
                                    value: 50,
                                    message: 'O nome de usuário deve ter menos de 50 caracteres.'
                                }
                            })}
                            className='w-full p-2 rounded-md text-black'
                        />
                        {errors.user && <p className='text-red-500 mt-2'>{errors.user.message as string}</p>}
                    </div>
                    <div>
                        <label className='block text-lg mb-2'>Email:</label>
                        <input
                            type="email"
                            defaultValue={user.email}
                            {...register('email', { required: 'Insira o seu email.' })}
                            className='w-full p-2 rounded-md text-black'
                        />
                        {errors.email && <p className='text-red-500 mt-2'>{errors.email.message as string}</p>}
                    </div>
                    <div>
                        <label className='block text-lg mb-2'>Nova Senha:</label>
                        <input
                            type="password"
                            {...register('password')}
                            className='w-full p-2 rounded-md text-black'
                        />
                        {errors.password && <p className='text-red-500 mt-2'>{errors.password.message as string}</p>}
                    </div>
                    <div>
                        <label className='block text-lg mb-2'>Confirme Nova Senha:</label>
                        <input
                            type="password"
                            {...register('confirmPassword', {
                                validate: (value) => value === password || "As senhas não coincidem."
                            })}
                            className='w-full p-2 rounded-md text-black'
                        />
                        {errors.confirmPassword && <p className='text-red-500 mt-2'>{errors.confirmPassword.message as string}</p>}
                    </div>
                    <div className="flex gap-8">
                        <button onClick={() => setMenuState(MenuState.Initial)}
                            type="submit" className='bg-red-500 w-1/2 hover:bg-red-600 text-white font-bold px-4 rounded-md'>
                            cancelar
                        </button>
                        <button
                            type="submit" className='bg-green-500 w-1/2 hover:bg-green-600 text-white font-bold py-4 px-4 rounded-md'>
                            confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileForm