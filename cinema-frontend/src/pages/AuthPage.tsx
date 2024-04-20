import React, { useState } from 'react';
import { useLoginMutation, useRegisterMutation } from '../redux/services/users/authApi';
import { User, userInfo } from '../redux/features/users/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { testApi } from '../redux/services/test/testApi';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const stateUser = useAppSelector(state => state.authState.user);
  const [name, setname] = useState('');
  const [tryGet, {data: data2}] = testApi.endpoints.getTest.useLazyQuery();
  const [tryGe, {data: data1}] = testApi.endpoints.getTest.useLazyQuery();
  const [tryG, {data: data3}] = testApi.endpoints.getTest.useLazyQuery();
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
     const response:any = await login({ username, password });
     const user:User = response.data;
     dispatch(userInfo({user}));
     tryGet('user');
     tryGe('all')
     tryG('admin')
     console.log(data1, data2)
     if(user.accessToken){
      localStorage.setItem("user", JSON.stringify(user))
     }
     const userFromStorage = JSON.parse(localStorage.getItem('user')!) as User;
     setname(userFromStorage.username);
    } catch (error) {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <br/>
      <h1>
        Testing: {data1?.message}
        Testing: {data2?.message}
        Testing: {data3?.message}
      </h1>
    </form>
  );
};

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await register({ username, password, email });
      // Handle successful registration
    } catch (error) {
      // Handle registration error
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
  );
};

const AuthPage = () => {



  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
      <h2>Register</h2>
      <RegisterForm />
    </div>
  );
};

export default AuthPage;