import React from 'react'

const ProtectedRoute = ({children}) => {

    const token = localStorage.getItem('TOKEN');
    const type = localStorage.getItem('TYPE');
    if (!token) {
        window.location.replace('/');
    }else{
        if(type !== "admin")
        {
            window.location.replace('/');
        }
    }

    return children;
  };

export default ProtectedRoute
