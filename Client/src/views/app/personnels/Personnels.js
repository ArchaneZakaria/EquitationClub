import React, { Fragment, useState ,useEffect}  from 'react'
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
  CSwitch
} from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs';
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CIcon from '@coreui/icons-react'

import employeData from '../personnels/EmployeData'
import historyData from '../personnels/HistoryData'
import detailsHistory from '../personnels/detailsHistory'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronUp,faHistory, faEllipsisH,faEdit,faInfoCircle,faTrashAlt, faCircle } from '@fortawesome/free-solid-svg-icons'


//Les champs du datatable historique
const fieldsHistory=[
    { key: 'Code', _style: { width: '15%'} },
    { key: 'Type', _style: { width: '12.5%'} },
    { key: 'Description', _style: { width: '32.5%'} },
    { key: 'Date', _style: { width: '12.5%'} },
    { key: 'Etat', _style: { width: '12.5%'} },
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
    { key: 'matricule', _style: { width: '15%'} },
    { key: 'nom', _style: { width: '15'} },
    { key: 'prenom', _style: { width: '22.5%'} },
    { key: 'fonction', _style: { width: '12.5%'} },
    { key: 'departement', _style: { width: '12.5%'} },
    { key: 'options', _style: { width: '22.5%'} },
    
  ]


  //Les champs du datatable employe

const fieldsMoreInfo=[
    { key: 'Type' },
    { key: 'Client' },
    { key: 'Cheval' },
    { key: 'Remarque' },
    
  ]
  //L'option qui permet de faire une tabulation



//L'option qui permet de consulter l'historique de l'employé
const ModalHistorique=(props)=>{

    const [data,setData]=useState(detailsHistory)
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
                                                  <CButton size="sm" shape="pill" color="secondary" className=""  title="Plus d'informations" style={{position: "relative",float:"left"}} onClick={()=>{toggleDetails(index)}}>
                                                {details.includes(index) ? <FontAwesomeIcon  size="sm" icon={faChevronUp}/> : <FontAwesomeIcon  size="sm" icon={faChevronDown}/>}
                                                </CButton>
                                              </td>
                                              )
                                          },
                                        'details':
                                            (item, index)=>{
                                              return (
                                              <CCollapse show={details.includes(index)}>
                                                <CCardBody>
                                                  <CDataTable 
                                                        clickableRows
                                                        items={data}
                                                        fields={fieldsMoreInfo}
                                                        hover
                                                        striped
                                                        bordered
                                                        size="sm"
                                                        itemsPerPage={1}
                                                        pagination
                                                    />
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
    const [matricule,setMatricule]=React.useState(props.employe.matricule)
    const [nom,setNom]=React.useState(props.employe.nom)
    const [prenom,setPrenom]=React.useState(props.employe.prenom)
    const [email,setEmail]=React.useState(props.employe.email)
    const [fonction,setFonction]=React.useState(props.employe.fonction)
    const [departement,setDepartement]=React.useState(props.employe.departement)
    const [password,setPassword]=React.useState()
    const [tele,setTele]=React.useState(props.employe.numeroTelephone)
    const [adresse,setAdresse]=React.useState(props.employe.adresse)
    const [dateEmbauche,setDateEmbauche]=React.useState('')
    const [defaults,setDefaults]=React.useState({
      nom:nom,
      prenom:prenom,
      email:email,
      telephone:tele,
  })
    
    const schema=yup.object().shape({
        matricule:yup.string().trim().required('Le matricule est obligatoire'),
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
      if(props.employe.nom!=nom){
          setNom(props.employe.nom)
          setPrenom(props.employe.prenom)
          setEmail(props.employe.email)
      }
      React.useEffect(() => {
        setValue("nom" , nom)
        setValue("prenom" , prenom)
        setValue("email" , email)
        setValue("telephone" , tele)
        setValue("matricule" , matricule)
        setValue("fonction" , fonction)
        setValue("departement" , departement)
      });
     
    
      const { register, handleSubmit , errors,formState,setValue} = useForm({resolver:yupResolver(schema)});
        
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
                            <CModalTitle>Modifier l'employé :{nom} {props.employe.prenom}</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                        <CForm action="#" method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                        <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="nom-input">Matricule</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir le matricule" {...register("matricule")}/>
                  {formState.errors.matricule &&errorMessage(formState.errors.matricule.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                        
                  <CCol md="3">
                    <CLabel htmlFor="nom-input">Nom</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir le nom" {...register("nom")} />
                  {formState.errors.nom &&errorMessage(formState.errors.nom.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="prenom-input">Prenom</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir le prenom" {...register("prenom")}  />
                  {formState.errors.prenom  &&errorMessage(formState.errors.prenom.message)}
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
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir le département" {...register("departement")}/>
                  {formState.errors.departement &&errorMessage(formState.errors.departement.message)}
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
                    <CLabel htmlFor="date-naissance-input">Date d'embauche</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                      <input className="col-md-12" type="date" {...register("dateEmbauche")}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol tag="label" sm="3" className="col-form-label">
                   Administrateur
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      className="mr-1"
                      color="primary"
                    />                    
                  </CCol>
                </CFormGroup>
                <CButton type="submit" size="sm" color="primary" onClick={() => setLarge(false)}><CIcon name="cil-scrubber"/> Modifier</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Annuler</CButton>
              </CForm>
                        </CModalBody>
                        <CModalFooter>
                        </CModalFooter>
            </CModal>
            </React.Fragment>
                    
    )}

}

//L'option de supprimer un employé 
const ModalDelete=(props)=>{
   const[show,setShow]=React.useState(true)
    const deleting=()=>{
        props.onDelete(props.id)
        setModal(!modal)
    }
    const [modal, setModal] =React.useState(props.showing)
    if(show){
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
    
    
                    
    )}else{
      return(
        <React.Fragment>
            
        </React.Fragment>
    
    
                    
    )
    }

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
const fieldsInfo = [
  "email",
  "numeroTelephone",
  "adresse",
  "dateEmbauche"
];

const ModalInfo=(props)=>{
    const [email,setEmail]=React.useState(props.employe.email)
    const [numeroTelephone,setNumeroTelephone]=React.useState(props.employe.numeroTelephone)
    const [adresse,setAdresse]=React.useState(props.employe.numeroTelephone)
    const [dateEmbauche,setDateEmbauche]=React.useState(props.employe.dateEmbauche)
    const [modal, setModal] =React.useState(props.showing)

    const data=[{
      "email":email,
      "numeroTelephone": numeroTelephone,
      "adresse": adresse,
      "dateEmbauche":dateEmbauche
    }]
    return(
            <React.Fragment>
                <CButton size="sm" shape="pill" color="secondary" className="" style={{position: "relative",float:"left"}}  title="Plus d informations"  onClick={() => setModal(!modal)}>
                    <FontAwesomeIcon  size="sm" icon={faInfoCircle}/>
                    </CButton>
                     <CModal 
                        show={modal} 
                        onClose={setModal}
                        size="lg"
                        >
                        <CModalHeader closeButton>
                            <CModalTitle>Informations générales :</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                   
                   <CDataTable
                            clickableRows
                            items={data}
                            fields={fieldsInfo}
                            hover
                            striped
                            bordered
                            size="sm"
                            itemsPerPage={10}
                            pagination
                          />
                       
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
        matricule:yup.string().trim().required('Le matricule est obligatoire'),
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
                    <CLabel htmlFor="nom-input">Matricule</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir le matricule" {...register("matricule")}/>
                  {formState.errors.matricule &&errorMessage(formState.errors.matricule.message)}
                  </CCol>
                </CFormGroup>
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
                    <CLabel htmlFor="date-naissance-input">Date d'embauche</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                      <input className="col-md-12" type="date" {...register("dateEmbauche")}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol tag="label" sm="3" className="col-form-label">
                   Administrateur
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      className="mr-1"
                      color="primary"
                    />                    
                  </CCol>
                </CFormGroup>
                <CButton type="submit" size="sm" color="primary" ><CIcon name="cil-scrubber"/> Créer</CButton>
              <CButton type="reset" size="sm" color="danger" onClick={() => setLarge(false)}><CIcon name="cil-ban" /> Annuler</CButton>
              </CForm>
                        </CModalBody>
                        <CModalFooter>
                            {' '}
                            
                        </CModalFooter>
            </CModal>
            </React.Fragment>
                    
    )

}


//Liste des employés
const Personnels = () => {
const [access,setAccess]=useState(true)
const [data,setData]=useState(employeData)
        const handleDelete = itemId => {
            const items = data.filter(item => item.id !== itemId);
            setData(items)
            alert(JSON.stringify(items))
            setAccess(false)
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
                    <ModalInfo showing={false}  employe={item}/>
                    <ModalEdit showing={false} access={access} employe={item}/>
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
