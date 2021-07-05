import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CFormText
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { reset } from 'enzyme/build/configuration';
import { useContext } from 'react';
import { AuthContext } from 'src/helpers/AuthContext';




const Login = (props) => {
  const { setIdtilisateur } = useContext(AuthContext)

  const schema = yup.object().shape({
    emailUtilisateur:yup.string().trim().email("Email invalide !").required("Veuillez saisir votre email !"),
    passwordUtilisateur:yup.string().trim().max(15).required("Veuillez saisir le mot de passe !").min(4, "Le mot de passe doit contenir au moins 4 caractéres")
  })

  
  const errorMessage = (error) => {
    return <CFormText color="danger">{error}</CFormText>;
  };
  const { register, handleSubmit, errors, formState, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {

    axios.post("http://localhost:3001/Utilisateur/login",data).then((response)=>{
      if(response.status==200){
        localStorage.setItem("accessToken",response.data.accessToken)
        setIdtilisateur(response.data.user);
       //props.setIdtilisateur(response.data.user)
        //alert(JSON.stringify(setAuthState));
        props.login(true);
      }else{
        
        props.login(false);
        
      }
    })
      };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                   action="#"
                   method="post"
                   encType="multipart/form-data"
                   className="form-horizontal"
                   onSubmit={handleSubmit(onSubmit)}
                  >
                    <h1>Se connecter</h1>
                    <p className="text-muted">Connectez-vous à votre compte</p>
                    {formState.errors.emailUtilisateur &&
                  errorMessage(formState.errors.emailUtilisateur.message)}
                    <CInputGroup className="mb-3">
                    
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" autoComplete="username" {...register("emailUtilisateur")}/>
                      
                    </CInputGroup>
                    
                    {formState.errors.passwordUtilisateur &&
                  errorMessage(formState.errors.passwordUtilisateur.message)}
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Mot de passe" autoComplete="current-password" {...register("passwordUtilisateur")} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" type="submit" className="px-4" >Se connecter</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5 d-md-down-none" style={{ width: '44%' ,backgroundColor:"#3aafa9"}}>
                <CCardBody className="text-center">
                  <div>
                    <h2>EquiClub</h2>
                    <p>Outil de gestion digitale des écuries tout-en-un.</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
