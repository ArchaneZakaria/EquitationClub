import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle,faHorseHead } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import { useContext } from 'react'
import { AuthContext } from 'src/helpers/AuthContext'

// sidebar nav config
import navigation from './_nav'
import navigation1 from './_nav1'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  const { utilisateur } = useContext(AuthContext)
  if(utilisateur.roleUtilisateur==2){
    return (
      <CSidebar
        show={show}
        onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
        style={{backgroundColor:"#2b7a78"}}
      >
        <CSidebarBrand className="d-md-down-none" to="/">
        <FontAwesomeIcon icon={faHorseHead} size="3x" />
         EquiClub
        </CSidebarBrand>
        <CSidebarNav>
          <CCreateElement
            items={navigation1}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        </CSidebarNav>
        <CSidebarMinimizer className="c-d-md-down-none"/>
      </CSidebar>
    )
  }else{
    return (
      <CSidebar
        show={show}
        onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
        style={{backgroundColor:"#2b7a78"}}
      >
        <CSidebarBrand className="d-md-down-none" to="/">
        <FontAwesomeIcon icon={faHorseHead} size="3x" />
         EquiClub
        </CSidebarBrand>
        <CSidebarNav>
          <CCreateElement
            items={navigation}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          />
        </CSidebarNav>
        <CSidebarMinimizer className="c-d-md-down-none"/>
      </CSidebar>
    )
  }
  
}

export default React.memo(TheSidebar)
