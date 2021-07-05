import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CButton,
  CLink
} from '@coreui/react'
import {
    faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import CIcon from '@coreui/icons-react'
import { useContext } from 'react'
import { AuthContext } from 'src/helpers/AuthContext'
import { Redirect } from "react-router-dom";
// routes config
import routes from '../routes'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
}  from './index'

const TheHeader = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  const { utilisateur } = useContext(AuthContext)
  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }
  const { setIdtilisateur  } = useContext(AuthContext)
  const logout=()=>{
      localStorage.removeItem("accessToken");
      props.login(false)
      
      return <Redirect to='/login'></Redirect>
  }


  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader withSubheader style={{backgroundColor:"#3aafa9",zIndex:1}}>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
      {/*<CIcon name="logo" height="48" alt="Logo"/>*/}
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto" >
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">Séances</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Taches</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
      <FontAwesomeIcon icon={faUserCircle} style={{marginRight:"10px",marginLeft:"7px"}}/> {utilisateur.nomUtilisateur} {utilisateur.prenomUtilisateur}
      {/*  <TheHeaderDropdown/> */}
      &nbsp;
      <CButton
        size="sm"
        shape="pill"
        color="secondary"
        className=""
        style={{ position: "relative", float: "left" }}
        title="Déconnexion"
        onClick={logout}
            >
              
        <FontAwesomeIcon size="sm" icon={faSignOutAlt} />
      </CButton>
      </CHeaderNav>

      <CSubheader  className="px-3 justify-content-between" style={{backgroundColor:"#def2f1"}}>
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
          
          </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
