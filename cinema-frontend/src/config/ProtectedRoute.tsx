import React, { Component } from 'react'
import { Navigate, Route } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import Unauthorized from '../pages/Unauthorized';

type Props = {
    roles: string[],
    element: React.ReactElement;
}


const ProtectedRoute = ({ roles, element}: Props) => {
    const user = useAppSelector((state) => state.userState.user);
    const isAuthorized = user && roles.some(role => user.roles.includes(role));

    return isAuthorized ? element : <Unauthorized />;
}

export default ProtectedRoute