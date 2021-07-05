import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { useContext } from 'react'
import { AuthContext } from 'src/helpers/AuthContext'
import {Redirect} from 'react-router-dom'
const TheLayout = (props) => {
  const { idUtilisateur } = useContext(AuthContext)
  if(!props.authorized){
    //alert(idUtilisateur.idUtilisateur)login={setAuthorized}
    return <Redirect to='/login'></Redirect>
  }else{
    //alert('idUtilisateur')
    return (
      <div className="c-app c-default-layout">
        <TheSidebar/>
        <div className="c-wrapper">
          <TheHeader login={props.login}/>
          <div className="c-body">
            <TheContent/>
          </div>
          <TheFooter/>
        </div>
      </div>
    )
  }
  
}

export default TheLayout
