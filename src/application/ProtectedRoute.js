import React from 'react'
import { Navigate } from 'react-router-dom'
export const ProtectedRoute = ({hasAcces,children}) => {
    if(!hasAcces){
        return <Navigate to='/' replace/>
    }
  return children;
}
