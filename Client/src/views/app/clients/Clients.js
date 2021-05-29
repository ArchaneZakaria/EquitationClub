import React, { useState,useEffect } from "react";
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
  CDataTable,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormText,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import ClientData from "../clients/ClientData";
import infoClient from "../clients/InfoClient";

import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faEdit,
  faInfoCircle,
  faTrashAlt,
  faBookMedical,
  faSignInAlt,
  faPlusSquareSquare,
  faPlusSquare,
  faUser,
  faChild,
} from "@fortawesome/free-solid-svg-icons";
import clientData from "../clients/ClientData";
const getBadge = (status) => {
  switch (status) {
    case "Payé":
      return "success";
    case "Non payé":
      return "danger";
    default:
      return "primary";
  }
};
const fields = [
  { key: "nom", _style: { width: "15%" } },
  { key: "prenom", _style: { width: "15" } },
  "DateNaissance",
  "statusPayement",
  { key: "options", _style: { width: "22%" } },
];
const fieldsInfo = [
  "datePremiereInscription",
  "nombreSeances",
  "nombreChevaux",
];

const ModalDelete = (props) => {
  const deleting = () => {
    props.onDelete(props.id);
    setModal(!modal);
  };
  const [modal, setModal] = React.useState(props.showing);
  return (
    <React.Fragment>
      <CButton
        size="sm"
        shape="pill"
        color="danger"
        className=""
        title="oui"
        style={{ position: "relative", float: "left" }}
        onClick={() => {
          setModal(!modal);
        }}
      >
        <FontAwesomeIcon size="sm" icon={faTrashAlt} />
      </CButton>
      <CModal show={modal} onClose={setModal}>
        <CModalHeader closeButton>
          <CModalTitle>Supprimer le client : </CModalTitle>
        </CModalHeader>
        <CModalBody>Êtes-vous sur de vouloir supprimer le client .</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={deleting}>
            Oui
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setModal(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};

const ModalInfo = (props) => {
  const [modal, setModal] = React.useState(props.showing);
  const [datePremiereInscription, setdatePremiereInscription] = React.useState(
    props.client.datePremiereInscription
  );
  const [nombreSeances, setnombreSeances] = React.useState(
    props.client.nombreSeances
  );
  const [nombreChevaux, setnombreChevaux] = React.useState(
    props.client.nombreChevaux
  );
  const data = [
    {
      datePremiereInscription: datePremiereInscription,
      nombreSeances: nombreSeances,
      nombreChevaux: nombreChevaux,
    },
  ];
  const table = ["datePremiereInscription", "nombreSeances", "nombreChevaux"];
  return (
    <React.Fragment>
      <CButton
        size="sm"
        shape="pill"
        color="secondary"
        className=""
        style={{ position: "relative", float: "left" }}
        title="Plus d'informations"
        onClick={() => setModal(!modal)}
      >
        <FontAwesomeIcon size="sm" icon={faInfoCircle} />
      </CButton>
      <CModal show={modal} onClose={setModal}>
        <CModalHeader closeButton>
          <CModalTitle>Informations générales</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CCard>
                <CCardBody>
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
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModal(false)}>
            Fermer
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};

const ModalNewClient = (props) => {
  const schema = yup.object().shape({
    nom: yup.string().trim().required("Le nom est obligatoire"),
    prenom: yup.string().required("Le prenom est obligatoire"),
    CIN: yup.string().required("Le CIN est obligatoire"),
    email: yup
      .string()
      .email("L'email est incorrect")
      .required("L'email est obligatoire"),
    password: yup
      .string()
      .min(4, "Le mot de passe doit contenir au moins 4 caractéres")
      .max(15)
      .required("Le mot de passe est obligatoire"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe ne correspondent pas !"
      ),
    telephone: yup.number().required("Le numéro de telephone est obligatoire"),
    adresse: yup.string().required("L'adresse est obligatoire"),
  });


  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const [large, setLarge] = useState(props.showing);

  const errorMessage = (error) => {
    return <CFormText color="danger">{error}</CFormText>;
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
  };
  return (
    <React.Fragment>
      <CButton
        color="primary"
        onClick={() => setLarge(!large)}
        className="mr-1"
      >
        Ajouter nouveau client{" "}
      </CButton>

      <CModal show={large} onClose={setLarge} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Ajouter un nouveau client</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm
            action="#"
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="nom-input">Nom</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir le nom"
                  {...register("nom")}
                />
                {formState.errors.nom &&
                  errorMessage(formState.errors.nom.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="prenom-input">Prénom</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir le prénom"
                  {...register("prenom")}
                />
                {formState.errors.prenom &&
                  errorMessage(formState.errors.prenom.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="CIN-input">CIN</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir le CIN"
                  {...register("CIN")}
                />
                {formState.errors.CIN &&
                  errorMessage(formState.errors.CIN.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="email-input">Adresse email</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir l'email"
                  {...register("email")}
                />
                {formState.errors.email &&
                  errorMessage(formState.errors.email.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="password-input">Mot de passe</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="password"
                  placeholder="Veuillez saisir le mot de passe"
                  {...register("password")}
                />
                {formState.errors.password &&
                  errorMessage(formState.errors.password.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="password-input">
                  Confirmer le mot de passe
                </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="password"
                  placeholder="Veuillez confirmer le mot de passe"
                  {...register("confirmPassword")}
                />
                {formState.errors.confirmPassword &&
                  errorMessage(formState.errors.confirmPassword.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="tel-input">Numéro de téléphone</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir le numéro de télephone"
                  {...register("telephone")}
                />
                {formState.errors.telephone &&
                  formState.errors.telephone.type === "required" &&
                  errorMessage("le numéro de téléphone est obligatoire")}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="adresse-input">Adresse</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir l'adresse"
                  {...register("adresse")}
                />
                {formState.errors.adresse &&
                  errorMessage(formState.errors.adresse.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-naissance-input">
                  Date de naissance
                </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="date"
                  {...register("dateNaissance")}
                />
              </CCol>
            </CFormGroup>
            <CButton
              type="reset"
              size="sm"
              color="danger"
              className="Boutton"
              onClick={() => setLarge(false)}
            >
              <CIcon name="cil-ban" />
              Annuler
            </CButton>
            <CButton
              type="submit"
              size="sm"
              className="Boutton"
              color="primary"
            >
              <CIcon name="cil-scrubber" /> Ajouter client
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </React.Fragment>
  );
};
const ModalEdit = (props) => {
  const [nom, setNom] = React.useState(props.client.nom);
  const [prenom, setPrenom] = React.useState(props.client.prenom);
  const [password, setPassword] = React.useState("");
  const [CIN, setCIN] = React.useState("");
  const [email, setEmail] = React.useState(props.client.email);
  const [dateNaissance, setDateNaissance] = React.useState("");
  const [tele, setTele] = React.useState("");
  const [adresse, setAdresse] = React.useState("");
  const schema = yup.object().shape({
    nom: yup.string().required("Le nom est obligatoire"),
    prenom: yup.string().required("Le prenom est obligatoire"),
    CIN: yup.string().required("Le CIN est obligatoire"),
    email: yup
      .string()
      .email("L'email est incorrect")
      .required("L'email est obligatoire"),
    password: yup
      .string()
      .min(4, "Le mot de passe doit contenir au moins 4 caractéres")
      .max(15)
      .required("Le mot de passe est obligatoire"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe ne correspondent pas !"
      ),
    telephone: yup.number().required("Le numéro de telephone est obligatoire"),
    dateNaissance: yup.string().required("La date de naissance est obligatoire"),
    adresse: yup.string().required("L'adresse est obligatoire"),
  });
  React.useEffect(() => {
    setValue("nom" , nom)
    setValue("prenom" , prenom)
    setValue("CIN" , CIN)
    setValue("password" , password)
    setValue("email" , email)
    setValue("telephone" , tele)
    setValue("adresse" , adresse)
  });
  const defaults = {
    nom: props.client.nom,
    prenom: props.client.prenom,
    email: props.client.email,
  };
  const { register, handleSubmit,setValue, errors, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const [large, setLarge] = useState(props.showing);

  const errorMessage = (error) => {
    return <CFormText color="danger">{error}</CFormText>;
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  if (!props.client) {
    return <React.Fragment></React.Fragment>;
  } else {
    return (
      <React.Fragment>
        <CButton
          size="sm"
          shape="pill"
          color="secondary"
          className=""
          title="Modifier"
          style={{ position: "relative", float: "left" }}
          onClick={() => setLarge(!large)}
        >
          <FontAwesomeIcon size="sm" icon={faEdit} />
        </CButton>
        <CModal show={large} onClose={setLarge} size="lg">
          <CModalHeader closeButton>
            <CModalTitle>
              Modifier le client : {props.client.nom} {props.client.prenom}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm
              action="#"
              method="post"
              encType="multipart/form-data"
              className="form-horizontal"
              onSubmit={handleSubmit(onSubmit)}
            >
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="nom-input">Nom</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le nom"
                    {...register("nom")}
                    onChange={(e) => {
                      setNom(e.target.value);
                    }}
                  />
                  {formState.errors.nom &&
                    errorMessage(formState.errors.nom.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="prenom-input">Prénom</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le prénom"
                    {...register("prenom")}
                    onChange={(e) => {
                      setPrenom(e.target.value);
                    }}
                  />
                  {formState.errors.prenom &&
                    errorMessage(formState.errors.prenom.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="CIN-input">CIN</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le CIN"
                    {...register("CIN")}
                    onChange={(e) => {
                      setCIN(e.target.value);
                    }}
                  />
                  {formState.errors.CIN &&
                    errorMessage(formState.errors.CIN.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="email-input">Adresse email</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir l'email"
                    {...register("email")}
                    onChange={(e) => {
                      setCIN(e.target.value);
                    }}
                  />
                  {formState.errors.email &&
                    errorMessage(formState.errors.email.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="password-input">Mot de passe</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="password"
                    placeholder="Veuillez saisir le mot de passe"
                    {...register("password")}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {formState.errors.password &&
                    errorMessage(formState.errors.password.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="password-input">
                    Confirmer le mot de passe
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="password"
                    placeholder="Veuillez confirmer le mot de passe"
                    {...register("confirmPassword")}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {formState.errors.confirmPassword &&
                    errorMessage(formState.errors.confirmPassword.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="tel-input">Numéro de téléphone</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le numéro de télephone"
                    {...register("telephone")}
                    onChange={(e) => {
                      setTele(e.target.value);
                    }}
                  />
                  {formState.errors.telephone &&
                    formState.errors.telephone.type === "required" &&
                    errorMessage("le numéro de téléphone est obligatoire")}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="adresse-input">Adresse</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir l'adresse "
                    {...register("adresse")}
                    onChange={(e) => {
                      setAdresse(e.target.value);
                    }}
                  />
                  {formState.errors.adresse &&
                    errorMessage(formState.errors.adresse.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-naissance-input">
                    Date de naissance
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="date"
                    {...register("dateNaissance")}
                    onChange={(e) => {
                      setDateNaissance(e.target.value);
                    }}
                  />
                </CCol>
              </CFormGroup>
              
              <CButton
                size="sm"
                color="danger"
                onClick={() => setLarge(false)}
                className="Boutton"
              >
                <CIcon name="cil-ban" /> Annuler
              </CButton>
              <CButton
                type="submit"
                size="sm"
                color="primary"
                className="Boutton"
              >
                <CIcon name="cil-scrubber" /> Créer
              </CButton>
            </CForm>
          </CModalBody>
        </CModal>
      </React.Fragment>
    );
  }
};
const ModalAssurance = (props) => {
  const [societeAssurance, setSocieteAssurance] = React.useState(
    props.client.societeAssurance
  );
  const [dateDebut, setDateDebut] = React.useState("");
  const [dateFin, setDateFin] = React.useState("");
  const [montant, setMontant] = React.useState("");
  const [typePaiement, setTypePaiement] = React.useState("");
  const schema = yup.object().shape({
    societeAssurance: yup
      .string()
      .required("La nom de la sociéte d'assurance est obligatoire."),
    dateDebut: yup.string().required("La date de début est obligatoire !!"),
    dateFin: yup.string().required("La date de fin est obligatoire !!"),
    montant: yup
      .string()
      .min(1, "Le montant doit etre supérieur à zero.")
      .required("Le montant est obligatoire"),
    typePaiement: yup.string().required("Liquide/Cheque/CarteBanquaire"),
  });
  const defaults = {
    nom: props.client.nom,
    prenom: props.client.prenom,
  };
  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaults,
  });

  const [large, setLarge] = useState(props.showing);

  const errorMessage = (error) => {
    return <CFormText color="danger">{error}</CFormText>;
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  if (!props.client) {
    return <React.Fragment></React.Fragment>;
  } else {
    return (
      <React.Fragment>
        <CButton
          size="sm"
          color="secondary"
          shape="pill"
          className=""
          title="Ajouter assurance"
          style={{ position: "relative", float: "left" }}
          onClick={() => setLarge(!large)}
        >
          <FontAwesomeIcon size="sm" icon={faBookMedical} />
        </CButton>
        <CModal show={large} onClose={setLarge} size="lg">
          <CModalHeader closeButton>
            <CModalTitle>
              Ajouter Assurance : {props.client.nom} {props.client.prenom}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm
              action="#"
              method="post"
              encType="multipart/form-data"
              className="form-horizontal"
              onSubmit={handleSubmit(onSubmit)}
            >
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="societeAssurance-input">
                    Société d'assurance
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le nom de la societe d'assurance"
                    {...register("societeAssurance")}
                  />
                  {formState.errors.societeAssurance &&
                    errorMessage(formState.errors.societeAssurance.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="dateDebut-input">Date de Debut</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="date"
                    placeholder="Veuillez saisir la date de début"
                    min="01/01/1970"
                    {...register("dateDebut")}
                  />
                  {formState.errors.dateDebut &&
                    errorMessage(formState.errors.dateDebut.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="dateFin-input">Date de Fin</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="date"
                    placeholder="Veuillez saisir la date de Fin"
                    min={dateDebut}
                    {...register("dateFin")}
                  />
                  {formState.errors.dateFin &&
                    errorMessage(formState.errors.dateFin.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="montant-input">Montant</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="number"
                    placeholder="Veuillez saisir le montant"
                    {...register("montant")}
                  />
                  {formState.errors.montant &&
                    errorMessage(formState.errors.montant.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Type Paiement</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <select  className="col-md-12" {...register("typePaiement")}>
                    <option value="liquide">Liquide</option>
                    <option value="cheque">Cheque </option>
                    <option value="virement">Virement</option>
                  </select>
                </CCol>
              </CFormGroup>
              <CButton
                size="sm"
                color="danger"
                className="Boutton"
                onClick={() => setLarge(false)}
              >
                <CIcon name="cil-ban" /> Annuler
              </CButton>
              <CButton
                type="submit"
                size="sm"
                color="primary"
                className="Boutton"
              >
                <CIcon name="cil-scrubber" /> Ajouter Assurance
              </CButton>
            </CForm>
          </CModalBody>
        </CModal>
      </React.Fragment>
    );
  }
};
const ModalInscription = (props) => {
  const schema = yup.object().shape({
    dateInscription: yup
      .string()
      .required("La date de debut de l'inscription est obligatoire"),
    dateFinInscription: yup.string().required("La date de fin est obligatoire"),
    montant: yup
      .string()
      .min(1, "Le montant doit etre supérieur à zero.")
      .required("Le montant est obligatoire"),
    typePaiement: yup.string(),
  
  });
  const defaults = {
    nom: props.client.nom,
    prenom: props.client.prenom,
    montant: props.client.montant,
  };
  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaults,
  });

  const [large, setLarge] = useState(props.showing);

  const errorMessage = (error) => {
    return <CFormText color="danger">{error}</CFormText>;
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  if (!props.client) {
    return <React.Fragment></React.Fragment>;
  } else {
    return (
      <React.Fragment>
        <CButton
          size="sm"
          color="secondary"
          shape="pill"
          className=""
          title="Ajouter Inscription"
          style={{ position: "relative", float: "left" }}
          onClick={() => setLarge(!large)}
        >
          <FontAwesomeIcon size="sm" icon={faSignInAlt} />
        </CButton>
        <CModal show={large} onClose={setLarge} className="modal">
          <CModalHeader closeButton>
            <CModalTitle>
              Ajouter Inscription: {props.client.nom} {props.client.prenom}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm
              action="#"
              method="post"
              encType="multipart/form-data"
              className="form-horizontal"
              onSubmit={handleSubmit(onSubmit)}
            >
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="dateInscription-input">Date de Debut</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="date"
                    placeholder="Veuillez saisir la date d'inscription"
                    {...register("dateInscription")}
                  />
                  {formState.errors.dateInscription &&
                    errorMessage(formState.errors.dateInscription.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="dateFinInscription-input">
                    Date de fin 
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="date"
                    placeholder="Veuillez saisir la date de Fin"
                    {...register("dateFinInscription")}
                  />
                  {formState.errors.dateFinInscription &&
                    errorMessage(formState.errors.dateFinInscription.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="montant-input">Montant</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="number"
                    placeholder="Veuillez saisir le montant"
                    {...register("montant")}
                  />
                  {formState.errors.montant &&
                    errorMessage(formState.errors.montant.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Type Paiement</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <select name="typePaiement" id ="typePaiement" className="col-md-12" required {...register("typePaiement") }>
                    <option value="none">Non payé </option>
                    <option value="liquide">Liquide</option>
                    <option value="cheque">Cheque </option>
                    <option value="carteBanquaire">Virement</option>
                  </select>
                </CCol>
              </CFormGroup>
              <CButton
                size="sm"
                color="danger"
                className="Boutton"
                onClick={() => setLarge(false)}
              >
                <CIcon name="cil-ban" /> Annuler
              </CButton>
              <CButton
                type="submit"
                size="sm"
                color="primary"
                className="Boutton"
              >
                <CIcon name="cil-scrubber" /> Ajouter Inscription
              </CButton>
            </CForm>
          </CModalBody>
        </CModal>
      </React.Fragment>
    );
  }
};
const Clients = () => {
  const [access,setAccess]=useState(true)
  const [data, setData] = useState(clientData);

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
            <CCardHeader>Liste des clients</CCardHeader>
            <CCardBody>
              <ModalNewClient showing={false} />
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
                scopedSlots={{
                  options: (item) => (
                    <td>
                      <ModalInfo client={item} />
                      <ModalEdit client={item} showing={false} />
                      <ModalAssurance client={item} showing={false} />
                      <ModalInscription client={item} showing={false} />
                      <ModalDelete
                        showing={false}
                        nom={item.nom}
                        onDelete={handleDelete}
                        id={item.id}
                      />
                    </td>
                  ),
                  statusPayement: (item) => (
                    <td>
                      <CBadge color={getBadge(item.statusPayement)}>
                        {item.statusPayement}
                      </CBadge>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Clients;
