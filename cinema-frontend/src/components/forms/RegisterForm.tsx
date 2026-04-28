import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../../redux/services/users/authApi'; // Adjust import path as needed
import { User } from '../../types/UserType';
import { useNavigate } from 'react-router-dom';
import { Err } from '../../types/ErrorType';
import { setUser } from '../../redux/features/users/authSlice';
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';

type AuthAction = 'login' | 'register';

type Props = {
  activeAuthAction: AuthAction | null;
  setActiveAuthAction: React.Dispatch<React.SetStateAction<AuthAction | null>>;
};

const RegisterForm = (props: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState<Err | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthBusy = props.activeAuthAction !== null || isLoading;
  const isRegisterLoading = props.activeAuthAction === 'register' || isLoading;

  const onSubmit = async (formData: any) => {
    if (isAuthBusy) {
      return;
    }

    props.setActiveAuthAction('register');
    try {
      const newUser: User = await registerUser(formData).unwrap(); 
      if (newUser) {
        setError(null);
        dispatch(setUser(newUser))
        navigate("/");
      }
    } catch (err) {
      if ((err as Err).status === 409) {
        setError({ status: (err as Err).status, message: 'Usuário já existe' });
      } else {
        setError({ status: 500, message: 'Um erro inesperado ocorreu' });
      }
    } finally {
      props.setActiveAuthAction(null);
    }
  };

  return (
    <div className='w-[500px] h-[100%]'>
      <h1 className='text-center'>Crie uma nova conta</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-6'>
        <div>
          <label className='block text-lg mb-2'>Nome de Usuário:</label>
          <input
            type="text"
            disabled={isAuthBusy}
            {...register('username', { required: 'Insira um nome de usuário.' })}
            className='w-full p-2 rounded-md text-black disabled:bg-gray-300'
          />
          {errors.username && <p className='text-red-500 mt-2'>{errors.username.message as string}</p>}
        </div>
        <div>
          <label className='block text-lg mb-2'>Email:</label>
          <input
            type="email"
            disabled={isAuthBusy}
            {...register('email', { 
              required: 'Insira um email válido.', 
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email inválido.',
              } 
            })}
            className='w-full p-2 rounded-md text-black disabled:bg-gray-300'
          />
          {errors.email && <p className='text-red-500 mt-2'>{errors.email.message as string}</p>}
        </div>
        <div>
          <label className='block text-lg mb-2'>Senha:</label>
          <input
            type="password"
            disabled={isAuthBusy}
            {...register('password', { 
              required: 'Insira uma senha.', 
              minLength: { value: 6, message: 'A senha deve ter pelo menos 6 caracteres.' },
            })}
            className='w-full p-2 rounded-md text-black disabled:bg-gray-300'
          />
          {errors.password && <p className='text-red-500 mt-2'>{errors.password.message as string}</p>}
        </div>
        <button type="submit" disabled={isAuthBusy} className='flex h-12 items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-md'>
          {isRegisterLoading && <ClipLoader size={22} color='white' />}
          {isRegisterLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      {error && <div className='mb-4 bg-gray-900 p-4 rounded-md w-full flex items-center justify-between text-3xl flex-wrap font-bold text-red-600'>
        erro: {error.message}
      </div>}
    </div>
  );
};

export default RegisterForm;
