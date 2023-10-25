import React from 'react';
import { Route, Routes, useNavigate, } from 'react-router-dom';

const PrivateRoute = ({element: Component, ...rest}) => {
    const Navigate = useNavigate();
    return<Routes> <Route {...rest} element={(props) => {
        const token = window.localStorage.getItem('token');
        if(token){
            return <Component {...props} />
        }else{
            
            Navigate("/signin") ;
        }
    }} /></Routes>
}

export default PrivateRoute;


// import React from "react";
// import { useNavigate, Route, Navigate, Routes } from "react-router-dom";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     const Navigate = useNavigate()
//   const token = window.localStorage.getItem("token");
//   if (!token) {
//     // return <Navigate to="/signin" replace />;
//     Navigate("/Signup")
//   }

//   return <Routes>
//     <Route {...rest} element={<Component />} />;
//   </Routes>;
// };

// export default PrivateRoute;
