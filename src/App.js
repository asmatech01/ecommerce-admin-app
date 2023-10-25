import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"
import './App.css';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions';
import Home from './containers/Home/index';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import Category from './containers/Category';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Carousel from './containers/CMS/Carousel';
import TermsAndConditions from './containers/CMS/TermsAndConditions';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
    
  }, [auth.authenticate]);
  return (
    <div className="App">
     <Router>
      <Routes>
          <Route path="/signup"  element={<Signup />}/>
          <Route path="/signin"  element={<Signin />}/>
      </Routes>
        
          <PrivateRoute path="/" exact Component={Home}/>
          <PrivateRoute path="/category"  Component={Category}/>
          <PrivateRoute path="/products"  Component={Products}/>
          <PrivateRoute path="/orders"  Component={Orders}/>
          <PrivateRoute path="/cms"  Component={Carousel}/>
          <PrivateRoute path="/terms-conditions"  Component={TermsAndConditions}/>
     </Router>
    </div>
  );
}

export default App;


// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom"
// import './App.css';
// import PrivateRoute from './components/HOC/PrivateRoute';
// import { useDispatch, useSelector } from 'react-redux';
// import { isUserLoggedIn, getInitialData } from './actions';
// import Home from './containers/Home/index';
// import Signup from './containers/Signup';
// import Signin from './containers/Signin';
// import Category from './containers/Category';
// import Products from './containers/Products';
// import Orders from './containers/Orders';

// function App() {

//   const dispatch = useDispatch();
//   const auth = useSelector(state => state.auth)


//   //componentDidMount or componentDidUpdate
//   useEffect(() => {
//     if (!auth.authenticate) {
//       dispatch(isUserLoggedIn());
//     }
//     if(auth.authenticate){
//       dispatch(getInitialData());
//     }
    

//   }, [auth.authenticate]);
//   return (
//     <div className="App">
// <Router>
//   <Routes>
//     <Route path="/signup" element={<Signup />}  />
//     <Route path="/signin"  element={<Signin />} />
//   </Routes>

//   <PrivateRoute path="/" exact component={Home} />
//   <PrivateRoute path="/category"  component={Category} />
//   <PrivateRoute path="/products"  component={Products} />
//   <PrivateRoute path="/orders"  component={Orders} />
// </Router>
//     </div>
//   );
// }

// export default App;
