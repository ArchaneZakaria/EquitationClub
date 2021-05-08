import React, { Fragment, useState }  from 'react'
import {
    CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CCollapse,
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
  CFormText,
  CPopover,
  CNav,
  CNavItem,
  CNavLink,
  CTabs,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs';
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

import employeData from '../personnels/EmployeData'
import historyData from '../personnels/HistoryData'

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faEllipsisH,faEdit,faInfoCircle,faTrashAlt } from '@fortawesome/free-solid-svg-icons'


//Les champs du datatable historique
const fieldsHistory=[
    { key: 'Code', _style: { width: '15%'} },
    { key: 'Description', _style: { width: '22.5%'} },
    { key: 'Date', _style: { width: '12.5%'} },
    { key: 'Etat', _style: { width: '12.5%'} },
    { key: 'Remarque', _style: { width: '22.5%'} },
    {
        key: 'show_details',
        label: '',
        _style: { width: '15%' },
        sorter: false,
        filter: false
      }
  ]

//Les champs du datatable employe

const fieldsEmploye=[
    { key: 'nom', _style: { width: '15%'} },
    { key: 'prenom', _style: { width: '15'} },
    { key: 'email', _style: { width: '22.5%'} },
    { key: 'matricule', _style: { width: '12.5%'} },
    { key: 'fonction', _style: { width: '12.5%'} },
    { key: 'options', _style: { width: '22.5%'} },
    
  ]

  //L'option qui permet de faire une tabulation



//L'option qui permet de consulter l'historique de l'employé
const ModalHistorique=(props)=>{


    const [modal, setModal] =React.useState(props.showing)
    const [details, setDetails] = useState([])

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
          newDetails.splice(position, 1)
        } else {
          newDetails = [...details, index]
        }
        setDetails(newDetails)
      }

    return(
        <React.Fragment>
            <CButton size="sm" shape="pill" color="secondary" className=""  title="Historique des taches" style={{position: "relative",float:"left"}}  onClick={()=>{setModal(!modal)}}>
                <FontAwesomeIcon  size="sm" icon={faHistory}/>
                </CButton>
                
                 <CModal 
                    show={modal} 
                    onClose={setModal}
                    size='lg'
                    >
                    <CModalHeader closeButton>
                        <CModalTitle>Historique des taches : {props.nom}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                    <CTabs activeTab="historique">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="historique">
                  historique
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="statistiques">
                  statistiques
                  </CNavLink>
                </CNavItem>
                
              </CNav>
              <CTabContent>
                <CTabPane data-tab="historique">
                <CDataTable 
                                    tableFilter
                                    clickableRows
                                    items={historyData}
                                    fields={fieldsHistory}
                                    hover
                                    striped
                                    bordered
                                    size="sm"
                                    itemsPerPage={10}
                                    pagination
                                    scopedSlots = {{
                                        
                                        'show_details':
                                          (item, index)=>{
                                            return (
                                              <td className="py-2">
                                                <CButton
                                                  color="primary"
                                                  variant="outline"
                                                  shape="square"
                                                  size="sm"
                                                  onClick={()=>{toggleDetails(index)}}
                                                >
                                                  {details.includes(index) ? 'Hide' : 'Show'}
                                                </CButton>
                                              </td>
                                              )
                                          },
                                        'details':
                                            (item, index)=>{
                                              return (
                                              <CCollapse show={details.includes(index)}>
                                                <CCardBody>
                                                  <h4>
                                                   
                                                  </h4>
                                                  <p className="text-muted">User since: </p>
                                                  <CButton size="sm" color="info">
                                                    User Settings
                                                  </CButton>
                                                  <CButton size="sm" color="danger" className="ml-1">
                                                    Delete
                                                  </CButton>
                                                </CCardBody>
                                              </CCollapse>
                                            )
                                          }
                                      }}
                                />
                </CTabPane>
                <CTabPane data-tab="statistiques">
                <CChartPie
                        datasets={[
                        {
                            backgroundColor: [
                            '#41B883',
                            '#00D8FF',
                            '#E46651'
                            ],
                            data: [80, 40, 30]
                        }
                        ]}
                        labels={['Réalisé', 'Reporté', 'Annulé']}
                        options={{
                        tooltips: {
                            enabled: true
                        }
                        }}
                    />
                </CTabPane>
              </CTabContent>
            </CTabs>
                                
                    </CModalBody>
                    <CModalFooter>
                        <CButton 
                        color="secondary" 
                        onClick={() => setModal(false)}
                        >Fermer</CButton>
                    </CModalFooter>
            </CModal>
        </React.Fragment>
                
)
}


//L'option qui permet de modifier un employé

const ModalEdit=(props)=>{
    const [nom,setNom]=React.useState(props.employe.nom)
    const [prenom,setPrenom]=React.useState(props.employe.prenom)
    const [email,setEmail]=React.useState(props.employe.email)
    const [password,setPassword]=React.useState('')
    const [tele,setTele]=React.useState('')
    const [adresse,setAdresse]=React.useState('')
    const [dateNaissance,setDateNaissance]=React.useState('')

    const schema=yup.object().shape({
        nom:yup.string().trim().required('Le nom est obligatoire'),
        prenom:yup.string().trim().required('Le prenom est obligatoire'),
        email:yup.string().trim().email('L email est incorrect').required('L email est obligatoire'),
        password:yup.string().max(15).required('Le mot de passe est obligatoire').min(4,'Le mot de passe doit contenir au moins 4 caractéres'),
        confirmPassword:yup.string().oneOf([yup.ref("password",),null],'Les mots de passe ne correspondent pas !'),
        telephone:yup.number().required('Le numero de telephone est obligatoire'),
        fonction:yup.string().required('La fonction est obligatoire'),
        departement:yup.string().required('Le département est obligatoire'),
        adresse:yup.string().required('L adresse est obligatoire')
      });
    const defaults={
        nom:props.employe.nom,
        prenom:props.employe.prenom,
        email:props.employe.email,
    }
      const { register, handleSubmit , errors,formState} = useForm({resolver:yupResolver(schema),defaultValues:defaults});

        const [large, setLarge] = useState(props.showing)

        const errorMessage = error => {
            return <CFormText color="danger">{error}</CFormText>
          };

          const onSubmit = (data) => {
            alert(JSON.stringify(data))
          }; 
          if(!props.employe){
              
            return(
                <React.Fragment></React.Fragment>)  
          }
          else{
           
    return(
            <React.Fragment>
                
                <CButton size="sm" shape="pill" color="secondary" className=""  title="Modifier" style={{position: "relative",float:"left"}}  onClick={() => setLarge(!large)}>
                    <FontAwesomeIcon  size="sm" icon={faEdit}/>
                    </CButton>    
                     <CModal 
                        show={large} 
                        onClose={setLarge}
                        size="lg"
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Modifier l'employé :{props.employe.nom} {props.employe.prenom}</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                        <CForm action="#" method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                
                <CFormGroup row>
                        
                  <CCol md="3">
                    <CLabel htmlFor="nom-input">Nom</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir le nom" {...register("nom")}  onChange={(e)=>{setNom(e.target.value)}}/>
                  {formState.errors.nom &&errorMessage(formState.errors.nom.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="prenom-input">Prenom</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir le prenom" {...register("prenom")}  onChange={(e)=>{setPrenom(e.target.value)}}/>
                  {formState.errors.prenom  &&errorMessage(formState.errors.prenom.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Adresse email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir l'email" {...register("email")} onChange={(e)=>{setEmail(e.target.value)}}/>
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
                            <CButton color="primary">Ajouter</CButton>{' '}
                            <CButton 
                            color="secondary" 
                            onClick={() => setLarge(false)}
                            >Cancel</CButton>
                        </CModalFooter>
            </CModal>
            </React.Fragment>
                    
    )}

}

//L'option de supprimer un employé 
const ModalDelete=(props)=>{

    const deleting=()=>{
        props.onDelete(props.id)
        setModal(!modal)
    }
    const [modal, setModal] =React.useState(props.showing)
    return(
            <React.Fragment>
                <CButton size="sm" shape="pill" color="danger" className=""  title="Supprimer" style={{position: "relative",float:"left"}}  onClick={()=>{setModal(!modal)}}>
                    <FontAwesomeIcon  size="sm" icon={faTrashAlt}/>
                    </CButton>
                    
                     <CModal 
                        show={modal} 
                        onClose={setModal}
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Confirmation</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            Etes-vous sur vous voulez supprimer ?
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="primary" onClick={deleting}>Oui</CButton>{' '}
                            <CButton 
                            color="secondary" 
                            onClick={() => setModal(false)}
                            >Annuler</CButton>
                        </CModalFooter>
                </CModal>
            </React.Fragment>
                    
    )

}



const Options=(props)=>{
    return (
        <Fragment>
            <CDropdown className="m-1">
              <CDropdownToggle color="secondary" size="sm">
                Small button
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>{props.edit}</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CPopover header="Popover header"
                    children={props.edit}
                    placement='top-end'
                    interactive={true}
                    trigger="click"
                    appendToBody={props.edit}
                  >
                    <CButton size="sm" shape="pill" color="secondary" className=""  title="Supprimer" style={{position: "relative",float:"left"}}  >
                    <FontAwesomeIcon  size="sm" icon={faEllipsisH}/>
                    </CButton>
                  </CPopover>
        </Fragment>
    )
}





//l'option qui permet de consulter les infos de l'employé

const ModalInfo=(props)=>{
    const [modal, setModal] =React.useState(props.showing)
    return(
            <React.Fragment>
                <CButton size="sm" shape="pill" color="secondary" className="" style={{position: "relative",float:"left"}}  title="Plus d informations"  onClick={() => setModal(!modal)}>
                    <FontAwesomeIcon  size="sm" icon={faInfoCircle}/>
                    </CButton>
                     <CModal 
                        show={modal} 
                        onClose={setModal}
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Informations générales :{props.nom}</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                        </CModalBody>
                        <CModalFooter>
                            <CButton 
                            color="secondary" 
                            onClick={() => setModal(false)}
                            >Fermer</CButton>
                        </CModalFooter>
            </CModal>
            </React.Fragment>
                    
    )

}


//L'option d'ajouter un nouveau employé
const ModalNewPersonnel=(props)=>{

    const schema=yup.object().shape({
        nom:yup.string().trim().required('Le nom est obligatoire').default('sss'),
        prenom:yup.string().trim().required('Le prenom est obligatoire'),
        email:yup.string().trim().email('L email est incorrect').required('L email est obligatoire'),
        password:yup.string().trim().max(15).required('Le mot de passe est obligatoire').min(4,'Le mot de passe doit contenir au moins 4 caractéres'),
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
                            <CButton color="primary">Ajouter</CButton>{' '}
                            <CButton 
                            color="secondary" 
                            onClick={() => setLarge(false)}
                            >Cancel</CButton>
                        </CModalFooter>
            </CModal>
            </React.Fragment>
                    
    )

}


//Liste des employés
const Personnels = () => {

const [data,setData]=useState(employeData)
        const handleDelete = itemId => {
            const items = data.filter(item => item.id !== itemId);
            setData(items)
            alert(JSON.stringify(items))
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
              fields={fieldsEmploye}
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
                    <ModalEdit showing={false} employe={item}/>
                    <ModalHistorique showing={false} nom={item.nom}/>
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
