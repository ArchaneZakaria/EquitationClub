import React, { useState }  from 'react'
import {
    CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CLabel,
  CSelect,
  CDataTable,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormText
} from '@coreui/react'
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

import employeData from '../personnels/EmployeData'

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
const fields = ['nom','prenom','email', 'DateNaissance', 'fonction','departement','options']


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

const ModalNewPersonnel=(props)=>{

    const schema=yup.object().shape({
        nom:yup.string().required('Le nom est obligatoire'),
        prenom:yup.string().required('Le prenom est obligatoire'),
        email:yup.string().email('L email est incorrect').required('L email est obligatoire'),
        password:yup.string().min(4,'Le mot de passe doit contenir au moins 4 caractéres').max(15).required('Le mot de passe est obligatoire'),
        confirmPassword:yup.string().oneOf([yup.ref("password",),null],'Les mots de passe ne correspondent pas !'),
        telephone:yup.number().required('Le numero de telephone est obligatoire'),
        fonction:yup.string().required('La fonction est obligatoire'),
        departement:yup.string().required('Le département est obligatoire'),
        adresse:yup.string().required('L adresse est obligatoire')
      });
    
      const { register, handleSubmit , errors,formState} = useForm({resolver:yupResolver(schema)});

        const [large, setLarge] = useState(props.showing)

        const errorMessage = error => {
            return <CFormText color="danger">{error}</CFormText>
          };

          const onSubmit = (data) => {
            alert(JSON.stringify(data))
          }; 
    return(
            <React.Fragment>
                <CButton color="primary" onClick={() => setLarge(!large)} className="mr-1">Nouveau employé </CButton>
                    
                     <CModal 
                        show={large} 
                        onClose={setLarge}
                        size="lg"
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Ajouter un nouveau employé</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                        <CForm action="#" method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                
                <CFormGroup row>
                        
                  <CCol md="3">
                    <CLabel htmlFor="nom-input">Nom</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir le nom" {...register("nom")}/>
                  {formState.errors.nom &&errorMessage(formState.errors.nom.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="prenom-input">Prenom</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir le prenom" {...register("prenom")}/>
                  {formState.errors.prenom  &&errorMessage(formState.errors.prenom.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Adresse email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir l'email" {...register("email")}/>
                  {formState.errors.email &&errorMessage(formState.errors.email.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Mot de passe</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="password" placeholder="Veuillez saisir le mot de passe" {...register("password")}/>
                    {formState.errors.password &&errorMessage(formState.errors.password.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Confirmer le mot de passe</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="password" placeholder="Veuillez confirmer le mot de passe" {...register("confirmPassword")}/>
                  {formState.errors.confirmPassword &&errorMessage(formState.errors.confirmPassword.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="tel-input">Numero de téléphone</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir le numero de telephone" {...register("telephone")}/>
                  {formState.errors.telephone &&formState.errors.telephone.type === "required" &&errorMessage("le numéro de téléphone est obligatoire")}
                   </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="adresse-input">Adresse</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir l'adresse'" {...register("adresse")}/>
                  {formState.errors.adresse &&errorMessage(formState.errors.adresse.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="adresse-input">Fonction</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir la fonction" {...register("fonction")}/>
                  {formState.errors.fonction &&errorMessage(formState.errors.fonction.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="adresse-input">Département</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir la fonction" {...register("departement")}/>
                  {formState.errors.departement &&errorMessage(formState.errors.departement.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-naissance-input">Date de naissance</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                      <input className="col-md-12" type="date" {...register("dateNaissance")}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Role de l'utilisateur</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <select className="col-md-12" {...register("role")}>
                      <option value="">Please select</option>
                        <option value="client">Client</option>
                        <option value="employe">Employé </option>
                    </select>
                      
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select2">Type du forfait</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="select2" id="select2">
                      <option value="0">Please select</option>
                      <option value="1">Mensuel</option>
                      <option value="2">Trimestriel </option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CButton type="submit" size="sm" color="primary" ><CIcon name="cil-scrubber"/> Créer</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Annuler</CButton>
              </CForm>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="primary">{props.nom}</CButton>{' '}
                            <CButton 
                            color="secondary" 
                            onClick={() => setLarge(false)}
                            >Cancel</CButton>
                        </CModalFooter>
            </CModal>
            </React.Fragment>
                    
    )

}

const Personnels = () => {

const [data,setData]=useState(employeData)
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
              Liste des personnels 
            </CCardHeader>
            <CCardBody>
            <ModalNewPersonnel showing={false}/>
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

export default Personnels
