import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../../redux/services/users/authApi'; // Adjust import path as needed
import { User } from '../../types/UserType';
import { useNavigate } from 'react-router-dom';
import { Err } from '../../types/ErrorType';
import { setUser } from '../../redux/features/users/authSlice';
import { useDispatch } from 'react-redux';

type Props = {};

const RegisterForm = (props: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registerUser] = useRegisterMutation();
  const [error, setError] = useState<Err | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (formData: any) => {
    try {
      const newUser: User = await registerUser(formData).unwrap(); 
      if (newUser) {
        console.log(newUser)
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
            {...register('username', { required: 'Insira um nome de usuário.' })}
            className='w-full p-2 rounded-md text-black'
          />
          {errors.username && <p className='text-red-500 mt-2'>{errors.username.message as string}</p>}
        </div>
        <div>
          <label className='block text-lg mb-2'>Email:</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Insira um email válido.', 
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email inválido.',
              } 
            })}
            className='w-full p-2 rounded-md text-black'
          />
          {errors.email && <p className='text-red-500 mt-2'>{errors.email.message as string}</p>}
        </div>
        <div>
          <label className='block text-lg mb-2'>Senha:</label>
          <input
            type="password"
            {...register('password', { 
              required: 'Insira uma senha.', 
              minLength: { value: 6, message: 'A senha deve ter pelo menos 6 caracteres.' },
            })}
            className='w-full p-2 rounded-md text-black'
          />
          {errors.password && <p className='text-red-500 mt-2'>{errors.password.message as string}</p>}
        </div>
        <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md'>
          Registrar
        </button>
      </form>
      {error && <div className='mb-4 bg-gray-900 p-4 rounded-md w-full flex items-center justify-between text-3xl flex-wrap font-bold text-red-600'>
        erro: {error.message}
      </div>}
    </div>
  );
};

export default RegisterForm;
