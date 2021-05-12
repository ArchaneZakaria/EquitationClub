import React from 'react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle,faHorseHead } from '@fortawesome/free-solid-svg-icons'


const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
   /* badge: {
      color: 'info',
      text: 'NEW',
    }*/
  },
  ////////////////////////////////
  {
    _tag: 'CSidebarNavTitle',
    _children: ['App']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Personnels',
    to: '/App/Personnels',
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Clients',
    to: '/App/Clients',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Séance',
    to: '/App/Seance',
    icon: 'cil-list',
  },{
    _tag: 'CSidebarNavItem',
    name: 'Tache',
    to: '/App/Tache',
    icon: 'cil-task',
  },{
    _tag: 'CSidebarNavItem',
    name: 'Facturations',
    to: '/App/Facturations',
    icon: 'cil-credit-card',
  },{
    _tag: 'CSidebarNavItem',
    name: 'Chevaux',
    to: '/App/Chevaux',
    icon: <FontAwesomeIcon icon={faHorseHead} style={{marginRight:"22px"}}/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Réclamations',
    to: '/App/Reclamations',
    icon: 'cil-comment-square',
  },
  ////////////////////////////////
  
]

export default _nav
