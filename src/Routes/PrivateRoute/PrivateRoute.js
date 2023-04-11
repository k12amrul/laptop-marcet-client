import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const PrivateRoute = ({ children }) => {

    const { user, isLoading } = useContext(AuthContext)
    const location = useLocation()

    // if (isLoading) {
    //     <h1>Loading</h1>
    // }

    if (user && user?.email) {
        return children
    }


    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
};

export default PrivateRoute;