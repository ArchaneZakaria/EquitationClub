import React, { useState }  from 'react'
import {
    CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

import usersData from '../../users/UsersData'

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle,faTrashAlt } from '@fortawesome/free-solid-svg-icons'


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['nom','prenom','role', 'email', 'DateNaissance','options']


const ModalDelete=(props)=>{

    const deleting=()=>{
        props.onDelete(props.id)
        setModal(!modal)
    }
    const [modal, setModal] =React.useState(props.showing)
    return(
            <React.Fragment>
                    <FontAwesomeIcon icon={faTrashAlt} onClick={()=>{setModal(!modal)}} />
                     <CModal 
                        show={modal} 
                        onClose={setModal}
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="primary" onClick={deleting}>DELETE</CButton>{' '}
                            <CButton 
                            color="secondary" 
                            onClick={() => setModal(false)}
                            >Cancel</CButton>
                        </CModalFooter>
                </CModal>
            </React.Fragment>
                    
    )

}

const ModalInfo=(props)=>{
    const [modal, setModal] =React.useState(props.showing)
    return(
            <React.Fragment>
                    <FontAwesomeIcon icon={faInfoCircle} onClick={() => setModal(!modal)} />
                     <CModal 
                        show={modal} 
                        onClose={setModal}
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Modal title</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="primary">{props.nom}</CButton>{' '}
                            <CButton 
                            color="secondary" 
                            onClick={() => setModal(false)}
                            >Cancel</CButton>
                        </CModalFooter>
            </CModal>
            </React.Fragment>
                    
    )

}

const Utilisateurs = () => {

const [data,setData]=useState(usersData)
        const handleDelete = itemId => {
            const items = data.filter(item => item.id !== itemId);
            setData(items)
          };
    
    
  return (
    <>
      
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Liste des utilisateurs 
            </CCardHeader>
            <CCardBody>
            <CDataTable
                tableFilter
                clickableRows
              items={data}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'options':
                  (item)=>(
                    <td> 
                    <ModalInfo showing={false} nom={item.nom}/>
                    <ModalDelete showing={false} nom={item.nom} onDelete={handleDelete} id={item.id} />
                    </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
        
    </>
  )
}

export default Utilisateurs
