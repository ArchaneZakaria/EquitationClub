import React, { Component }  from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useContext } from 'react'
import {AuthContext} from './helpers/AuthContext'
import { useEffect } from 'react';
import axios from 'axios';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const App=(props)=>{
const [authorized,setAuthorized]=useState();
const { utilisateur  } = useContext(AuthContext)
const [idUtilisateur, setIdtilisateur] = useState({idUtilisateur:0});
if (localStorage.getItem("accessToken")) {
  //setIdtilisateur(utilisateur);
}

let where;

  where=<Login {...props} login={setAuthorized} setIdtilisateur={setIdtilisateur}/>
const updater=(value)=>{
  setIdtilisateur(value)
}

let up;
/*
useEffect(()=>{
  
  if(localStorage.getItem("accessToken")){
    setAuthorized(true)
    //up=<AuthContext.Consumer>{value=>(alert(JSON.stringify(value) ))}</AuthContext.Consumer>;
    
    
  }else{
    setAuthorized(false)
  }
},[])*/

useEffect(()=>{
  axios.get("http://localhost:3001/Utilisateur/auth",{headers:{accessToken:localStorage.getItem("accessToken")}}).then(
    (response)=>{
        if(response.data.error){
          setAuthorized(false)
        }else{
          //alert("dssd")
          //alert(JSON.stringify(response.data))
          setAuthorized(true)
          setIdtilisateur(response.data.user)
        }
    }
  )
},[])

/*useEffect(()=>{
  if(localStorage.getItem("accessToken")){
    alert(JSON.stringify(idUtilisateur))
    //setIdtilisateur(utilisateur)
  }
},[authorized])*/
  return (
    
    <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <AuthContext.Provider value={{ utilisateur:idUtilisateur ,setIdtilisateur:setIdtilisateur}}>
            {up}
            <Route exact path="/login" name="Login Page"   > {where}</Route>
            <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
            <Route path="/" name="Home" render={props => <TheLayout login={setAuthorized} {...props} authorized={authorized}/>} />
            </AuthContext.Provider>
          </Switch>
        </React.Suspense>
    </HashRouter>
  );
}

export default App;
