import React from 'react'
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CAlert,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Creeremploye=(props)=>{
    if(props.show){
        return (
        
            <React.Fragment>
            <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="matricule-input">Matricule employé</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput id="matricule-input" name="matricule-input" placeholder="Veuillez saisir le matricule d'employé" />
                       </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="fonction-input">Fonction employé</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput id="fonction-input" name="fonction-matricule" placeholder="Veuillez saisir la fonction d'employé" />
                       </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="departement-input">Département employé</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput id="departement-input" name="departement-matricule" placeholder="Veuillez saisir le departement d'employé" />
                       </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="date-embauche-input">Date d'embauche</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput type="date" id="date-embauche-input" name="date-embauche-input" placeholder="date" />
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
                    </React.Fragment>
        );
    }else{
        return(
            <React.Fragment></React.Fragment>
        )
    }
    
}

const Creerutilisateur = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)
  const [nom,setNom]=React.useState('')
  const [prenom,setPrenom]=React.useState('')
  const [email,setEmail]=React.useState('')
  const [password,setPassword]=React.useState('')
  const [tele,setTele]=React.useState('')
  const [adresse,setAdresse]=React.useState('')
  const [dateNaissance,setDateNaissance]=React.useState('')
  const [employe,setEmploye]=React.useState(false)
  const [roleUser,setRoleUser]=React.useState('')

  const [visible, setVisible] = React.useState(10)

  const schema=yup.object().shape({
    nom:yup.string().required('Le nom est obligatoire'),
    prenom:yup.string().required('Le prenom est obligatoire'),
    email:yup.string().email('L email est incorrect').required('L email est obligatoire'),
    password:yup.string().min(4,'Le mot de passe doit contenir au moins 4 caractéres').max(15).required('Le mot de passe est obligatoire'),
    confirmPassword:yup.string().oneOf([yup.ref("password",),null],'Les mots de passe ne correspondent pas !'),
    telephone:yup.number().required()
  });

  const { register, handleSubmit , errors,formState} = useForm({resolver:yupResolver(schema)});
  
  const onSubmit = (data) => {
    alert(JSON.stringify(data))
  };

    const handleChange=(e)=>{
        setRoleUser(e.target.value)
        if(e.target.value==="employe"){
            setEmploye(true)
        }else{
            setEmploye(false)
        }
    }
    const errorMessage = error => {
      return <CFormText color="danger">{error}</CFormText>
    };
  return (
    <>
      
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              Créer un utilisateur
            </CCardHeader>
            <CCardBody>
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
                <Creeremploye show={employe}/>
                <CButton type="submit" size="sm" color="primary" ><CIcon name="cil-scrubber"/> Créer</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Annuler</CButton>
              </CForm>
            </CCardBody>
            <CCardFooter>
              
            </CCardFooter>
          </CCard>
          
        </CCol>
        
      </CRow>
      
      
    </>
  )
}

export default Creerutilisateur
