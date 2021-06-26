import React, { Fragment, useState, useEffect } from "react";
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
  CSwitch,
} from "@coreui/react";
import { CChartPie } from "@coreui/react-chartjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CIcon from "@coreui/icons-react";

import employeData from "../personnels/EmployeData";
import historyData from "../personnels/HistoryData";
import detailsHistory from "../personnels/detailsHistory";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faHistory,
  faEllipsisH,
  faEdit,
  faInfoCircle,
  faTrashAlt,
  faCircle,
  faThermometerQuarter,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { CToast, CToastBody, CToastHeader, CToaster } from "@coreui/react";
import { reset } from "enzyme/build/configuration";

//Les champs du datatable historique
const fieldsHistory = [
  { key: "Code", _style: { width: "15%" } },
  { key: "Type", _style: { width: "12.5%" } },
  { key: "Description", _style: { width: "32.5%" } },
  { key: "Date", _style: { width: "12.5%" } },
  { key: "Etat", _style: { width: "12.5%" } },
  {
    key: "show_details",
    label: "",
    _style: { width: "15%" },
    sorter: false,
    filter: false,
  },
];

//Les champs du datatable employe

const fieldsEmploye = [
  { key: "matriculeEmploye", label: "Matricule", _style: { width: "15%" } },
  { key: "nomUtilisateur", label: "Nom", _style: { width: "15" } },
  { key: "prenomUtilisateur", label: "Prenom", _style: { width: "22.5%" } },
  { key: "fonctionEmploye", label: "Fonction", _style: { width: "12.5%" } },
  {
    key: "departementEmploye",
    label: "Departement",
    _style: { width: "12.5%" },
  },
  { key: "options", _style: { width: "22.5%" } },
];

//Les champs du datatable employe

const fieldsMoreInfo = [
  { key: "Type" },
  { key: "Client" },
  { key: "Cheval" },
  { key: "Remarque" },
];
//L'option qui permet de faire une tabulation

//L'option qui permet de consulter l'historique de l'employé
const ModalHistorique = (props) => {
  const [data, setData] = useState(detailsHistory);
  const [modal, setModal] = React.useState(props.showing);
  const [details, setDetails] = useState([]);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  return (
    <React.Fragment>
      <CButton
        size="sm"
        shape="pill"
        color="secondary"
        className=""
        title="Historique des taches"
        style={{ position: "relative", float: "left" }}
        onClick={() => {
          setModal(!modal);
        }}
      >
        <FontAwesomeIcon size="sm" icon={faHistory} />
      </CButton>

      <CModal show={modal} onClose={setModal} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Historique des taches : {props.nom}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTabs activeTab="historique">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink data-tab="historique">historique</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="statistiques">statistiques</CNavLink>
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
                  scopedSlots={{
                    show_details: (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            size="sm"
                            shape="pill"
                            color="secondary"
                            className=""
                            title="Plus d'informations"
                            style={{ position: "relative", float: "left" }}
                            onClick={() => {
                              toggleDetails(index);
                            }}
                          >
                            {details.includes(index) ? (
                              <FontAwesomeIcon size="sm" icon={faChevronUp} />
                            ) : (
                              <FontAwesomeIcon size="sm" icon={faChevronDown} />
                            )}
                          </CButton>
                        </td>
                      );
                    },
                    details: (item, index) => {
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
                      );
                    },
                  }}
                />
              </CTabPane>
              <CTabPane data-tab="statistiques">
                <CChartPie
                  datasets={[
                    {
                      backgroundColor: ["#41B883", "#00D8FF", "#E46651"],
                      data: [80, 40, 30],
                    },
                  ]}
                  labels={["Réalisé", "Reporté", "Annulé"]}
                  options={{
                    tooltips: {
                      enabled: true,
                    },
                  }}
                />
              </CTabPane>
            </CTabContent>
          </CTabs>
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

//L'option qui permet de modifier un employé

const ModalEdit = (props) => {
  const [matricule, setMatricule] = React.useState(
    props.employe.matriculeEmploye
  );
  const [nom, setNom] = React.useState(props.employe.nomUtilisateur);
  const [prenom, setPrenom] = React.useState(props.employe.prenomUtilisateur);
  const [email, setEmail] = React.useState(props.employe.emailUtilisateur);
  const [fonction, setFonction] = React.useState(props.employe.fonctionEmploye);
  const [admin, setAdmin] = React.useState(props.employe.roleEmploye);
  const [checked, setChecked] = React.useState();
  const [departement, setDepartement] = React.useState(
    props.employe.departementEmploye
  );
  const [password, setPassword] = React.useState();
  const [tele, setTele] = React.useState(props.employe.telephoneUtilisateur);
  const [adresse, setAdresse] = React.useState(
    props.employe.adresseUtilisateur
  );
  const [dateEmbauche, setDateEmbauche] = React.useState(
    props.employe.dateembaucheEmploye
  );
  const [defaults, setDefaults] = React.useState({
    nom: nom,
    prenom: prenom,
    email: email,
    telephone: tele,
  });

  const schema = yup.object().shape({
    matriculeEmploye: yup
      .string()
      .trim()
      .required("Le matricule est obligatoire"),
    nomUtilisateur: yup
      .string()
      .trim()
      .required("Le nom est obligatoire")
      .default("sss"),
    prenomUtilisateur: yup
      .string()
      .trim()
      .required("Le prenom est obligatoire"),
    emailUtilisateur: yup
      .string()
      .trim()
      .email("L email est incorrect")
      .required("L email est obligatoire"),

    telephoneUtilisateur: yup
      .number()
      .required("Le numero de telephone est obligatoire"),
    fonctionEmploye: yup.string().required("La fonction est obligatoire"),
    departementEmploye: yup.string().required("Le département est obligatoire"),
    adresseUtilisateur: yup.string().required("L adresse est obligatoire"),
    dateembaucheEmploye: yup
      .date()
      .required("La date d'embauche est obligatoire"),
  });

  if (props.employe.matriculeEmploye != matricule) {
    setMatricule(props.employe.matriculeEmploye);
    setNom(props.employe.nomUtilisateur);
    setPrenom(props.employe.prenomUtilisateur);
    setEmail(props.employe.emailUtilisateur);
    setFonction(props.employe.fonctionEmploye);
    setDepartement(props.employe.departementEmploye);
    setTele(props.employe.telephoneUtilisateur);
    setAdresse(props.employe.adresseUtilisateur);
    setDateEmbauche(props.employe.dateembaucheEmploye);
    setAdmin(props.employe.roleEmploye);
  }
  React.useEffect(() => {
    setValue("nomUtilisateur", nom);
    setValue("prenomUtilisateur", prenom);
    setValue("emailUtilisateur", email);
    setValue("telephoneUtilisateur", tele);
    setValue("matriculeEmploye", matricule);
    setValue("fonctionEmploye", fonction);
    setValue("departementEmploye", departement);
    setValue("adresseUtilisateur", adresse);
    setValue("dateembaucheEmploye", dateEmbauche);
    if (admin == 2) {
      setChecked(true);
    }
  }, [props.employe.matriculeEmploye]);

  const { register, handleSubmit, errors, formState, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const [large, setLarge] = useState(props.showing);

  const errorMessage = (error) => {
    return <CFormText color="danger">{error}</CFormText>;
  };

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/Employe/modifierEmploye", [
        props.employe,
        data,
      ])
      .then((response) => {
        if (response.status == 200) {
          setLarge(!large);
          props.onUpdate();
          props.titrer("Modification");
          props.alerter("Employé modifié avec succés.");
          props.setShowAlert();
          reset();
        } else {
          setLarge(!large);
          props.titrer("Modification");
          props.alerter("Echec de l'opération.");
          props.setShowAlert();
          reset();
        }
      });
  };
  if (!props.employe) {
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
              Modifier l'employé :{nom} {props.employe.prenom}
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
                  <CLabel htmlFor="nom-input">Matricule</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le matricule"
                    {...register("matriculeEmploye")}
                  />
                  {formState.errors.matriculeEmploye &&
                    errorMessage(formState.errors.matriculeEmploye.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="nom-input">Nom</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le nom"
                    {...register("nomUtilisateur")}
                  />
                  {formState.errors.nomUtilisateur &&
                    errorMessage(formState.errors.nomUtilisateur.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="prenom-input">Prenom</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le prenom"
                    {...register("prenomUtilisateur")}
                  />
                  {formState.errors.prenomUtilisateur &&
                    errorMessage(formState.errors.prenomUtilisateur.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="adresse-input">Fonction</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir la fonction"
                    {...register("fonctionEmploye")}
                  />
                  {formState.errors.fonctionEmploye &&
                    errorMessage(formState.errors.fonctionEmploye.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="adresse-input">Département</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le département"
                    {...register("departementEmploye")}
                  />
                  {formState.errors.departementEmploye &&
                    errorMessage(formState.errors.departementEmploye.message)}
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
                    {...register("emailUtilisateur")}
                  />
                  {formState.errors.emailUtilisateur &&
                    errorMessage(formState.errors.emailUtilisateur.message)}
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="tel-input">Numero de téléphone</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le numero de telephone"
                    {...register("telephoneUtilisateur")}
                  />
                  {formState.errors.telephoneUtilisateur &&
                    formState.errors.telephoneUtilisateur.type === "required" &&
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
                    placeholder="Veuillez saisir l'adresse'"
                    {...register("adresseUtilisateur")}
                  />
                  {formState.errors.adresseUtilisateur &&
                    errorMessage(formState.errors.adresseUtilisateur.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-naissance-input">
                    Date d'embauche
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="date"
                    {...register("dateembaucheEmploye")}
                  />
                  {formState.errors.dateembaucheEmploye &&
                    errorMessage(formState.errors.dateembaucheEmploye.message)}
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
                    onChange={() => {
                      setChecked(!checked);
                    }}
                    checked={checked}
                    {...register("admin")}
                  />
                </CCol>
              </CFormGroup>
              <CButton type="submit" size="sm" color="primary">
                <CIcon name="cil-scrubber" /> Modifier
              </CButton>
              <CButton type="reset" size="sm" color="danger">
                <CIcon name="cil-ban" /> Annuler
              </CButton>
            </CForm>
          </CModalBody>
          <CModalFooter></CModalFooter>
        </CModal>
      </React.Fragment>
    );
  }
};

//L'option de supprimer un employé
const ModalDelete = (props) => {
  const [show, setShow] = React.useState(true);
  const deleting = () => {
    axios
      .post("http://localhost:3001/Employe/supprimerEmploye", props.employe)
      .then((response) => {
        if (response.status == 200) {
          setModal(!modal);
          props.onDelete();
          props.titrer("Suppression");
          props.alerter("Employé supprimé avec succés.");
          props.setShowAlert();
          reset();
        } else {
          setModal(!modal);
          props.titrer("Suppression");
          props.alerter("Echec de l'opération.");
          props.setShowAlert();
          reset();
        }
      });

    //props.onDelete(props.id);
    setModal(!modal);
  };
  const [modal, setModal] = React.useState(props.showing);
  if (show) {
    return (
      <React.Fragment>
        <CButton
          size="sm"
          shape="pill"
          color="danger"
          className=""
          title="Supprimer"
          style={{ position: "relative", float: "left" }}
          onClick={() => {
            setModal(!modal);
          }}
        >
          <FontAwesomeIcon size="sm" icon={faTrashAlt} />
        </CButton>

        <CModal show={modal} onClose={setModal}>
          <CModalHeader closeButton>
            <CModalTitle>Confirmation</CModalTitle>
          </CModalHeader>
          <CModalBody>Etes-vous sur vous voulez supprimer ?</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={deleting}>
              Oui
            </CButton>{" "}
            <CButton color="secondary" onClick={() => setModal(false)}>
              Annuler
            </CButton>
          </CModalFooter>
        </CModal>
      </React.Fragment>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

const Options = (props) => {
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
      <CPopover
        header="Popover header"
        children={props.edit}
        placement="top-end"
        interactive={true}
        trigger="click"
        appendToBody={props.edit}
      >
        <CButton
          size="sm"
          shape="pill"
          color="secondary"
          className=""
          title="Supprimer"
          style={{ position: "relative", float: "left" }}
        >
          <FontAwesomeIcon size="sm" icon={faEllipsisH} />
        </CButton>
      </CPopover>
    </Fragment>
  );
};

//l'option qui permet de consulter les infos de l'employé
const fieldsInfo = ["email", "numeroTelephone", "adresse", "dateEmbauche"];

const ModalInfo = (props) => {
  const [email, setEmail] = React.useState(props.employe.emailUtilisateur);
  const [numeroTelephone, setNumeroTelephone] = React.useState(
    props.employe.telephoneUtilisateur
  );
  const [adresse, setAdresse] = React.useState(
    props.employe.adresseUtilisateur
  );
  const [dateEmbauche, setDateEmbauche] = React.useState(
    props.employe.dateembaucheEmploye
  );
  const [modal, setModal] = React.useState(props.showing);

  const data = [
    {
      email: email,
      numeroTelephone: numeroTelephone,
      adresse: adresse,
      dateEmbauche: dateEmbauche,
    },
  ];

  React.useEffect(() => {
    setEmail(props.employe.emailUtilisateur);
    setNumeroTelephone(props.employe.telephoneUtilisateur);
    setAdresse(props.employe.adresseUtilisateur);
    setDateEmbauche(props.employe.dateembaucheEmploye);
  }, [props.employe.matriculeEmploye]);
  return (
    <React.Fragment>
      <CButton
        size="sm"
        shape="pill"
        color="secondary"
        className=""
        style={{ position: "relative", float: "left" }}
        title="Plus d informations"
        onClick={() => setModal(!modal)}
      >
        <FontAwesomeIcon size="sm" icon={faInfoCircle} />
      </CButton>
      <CModal show={modal} onClose={setModal} size="lg">
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
          <CButton color="secondary" onClick={() => setModal(false)}>
            Fermer
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};

//L'option d'ajouter un nouveau employé
const ModalNewPersonnel = (props) => {
  const schema = yup.object().shape({
    matriculeEmploye: yup
      .string()
      .trim()
      .required("Le matricule est obligatoire"),
    nomUtilisateur: yup
      .string()
      .trim()
      .required("Le nom est obligatoire")
      .default("sss"),
    prenomUtilisateur: yup
      .string()
      .trim()
      .required("Le prenom est obligatoire"),
    emailUtilisateur: yup
      .string()
      .trim()
      .email("L email est incorrect")
      .required("L email est obligatoire"),
    passwordUtilisateur: yup
      .string()
      .trim()
      .max(15)
      .required("Le mot de passe est obligatoire")
      .min(4, "Le mot de passe doit contenir au moins 4 caractéres"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("passwordUtilisateur"), null],
        "Les mots de passe ne correspondent pas !"
      ),
    telephoneUtilisateur: yup
      .string()
      .required("Le numero de telephone est obligatoire"),
    fonctionEmploye: yup.string().required("La fonction est obligatoire"),
    departementEmploye: yup.string().required("Le département est obligatoire"),
    adresseUtilisateur: yup.string().required("L adresse est obligatoire"),
  });

  const { register, handleSubmit, errors, formState, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [large, setLarge] = useState(props.showing);

  const errorMessage = (error) => {
    return <CFormText color="danger">{error}</CFormText>;
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    axios
      .post("http://localhost:3001/Employe/creerEmploye", data)
      .then((response) => {
        if (response.status == 200) {
          setLarge(!large);
          props.onAdd();
          props.titrer("Ajout");
          props.alerter("Employé ajouté avec succés.");
          props.setShowAlert();
          reset();
        } else {
          setLarge(!large);
          props.titrer("Ajout");
          props.alerter("Echec de l'opération.");
          props.setShowAlert();
          reset();
        }
      });
    //alert(JSON.stringify(data))
  };
  return (
    <React.Fragment>
      <CButton
        color="primary"
        onClick={() => setLarge(!large)}
        className="mr-1"
      >
        Nouveau employé{" "}
      </CButton>

      <CModal show={large} onClose={setLarge} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Ajouter un nouveau employé</CModalTitle>
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
                <CLabel htmlFor="">Matricule</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir le matricule"
                  {...register("matriculeEmploye")}
                />
                {formState.errors.matriculeEmploye &&
                  errorMessage(formState.errors.matriculeEmploye.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="">Nom</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir le nom"
                  {...register("nomUtilisateur")}
                />
                {formState.errors.nomUtilisateur &&
                  errorMessage(formState.errors.nomUtilisateur.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="">Prenom</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir le prenom"
                  {...register("prenomUtilisateur")}
                />
                {formState.errors.prenomUtilisateur &&
                  errorMessage(formState.errors.prenomUtilisateur.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="">Fonction</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir la fonction"
                  {...register("fonctionEmploye")}
                />
                {formState.errors.fonctionEmploye &&
                  errorMessage(formState.errors.fonctionEmploye.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="">Département</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir la fonction"
                  {...register("departementEmploye")}
                />
                {formState.errors.departementEmploye &&
                  errorMessage(formState.errors.departementEmploye.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="">Adresse email</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir l'email"
                  {...register("emailUtilisateur")}
                />
                {formState.errors.emailUtilisateur &&
                  errorMessage(formState.errors.emailUtilisateur.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="">Mot de passe</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="password"
                  placeholder="Veuillez saisir le mot de passe"
                  {...register("passwordUtilisateur")}
                />
                {formState.errors.passwordUtilisateur &&
                  errorMessage(formState.errors.passwordUtilisateur.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="">Confirmer le mot de passe</CLabel>
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
                <CLabel htmlFor="">Numero de téléphone</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir le numero de telephone"
                  {...register("telephoneUtilisateur")}
                />
                {formState.errors.telephoneUtilisateur &&
                  formState.errors.telephoneUtilisateur.type === "required" &&
                  errorMessage("le numéro de téléphone est obligatoire")}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="">Adresse</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir l'adresse"
                  {...register("adresseUtilisateur")}
                />
                {formState.errors.adresseUtilisateur &&
                  errorMessage(formState.errors.adresseUtilisateur.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="">Date d'embauche</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="date"
                  {...register("dateembaucheEmploye")}
                />
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
                  {...register("admin")}
                />
              </CCol>
            </CFormGroup>
            <CButton type="submit" size="sm" color="primary">
              <CIcon name="cil-scrubber" /> Créer
            </CButton>
            <CButton
              type="reset"
              size="sm"
              color="danger"
              onClick={() => setLarge(false)}
            >
              <CIcon name="cil-ban" /> Annuler
            </CButton>
          </CForm>
        </CModalBody>
        <CModalFooter> </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};

//Liste des employés
const Personnels = () => {
  const [access, setAccess] = useState(true);
  const [data, setData] = useState();
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  {
    /*{ position: 'static', autohide: 3000 }, */
  }
  const [toasts, setToasts] = useState([]);

  const [position, setPosition] = useState("top-right");
  const [autohide, setAutohide] = useState(true);
  const [autohideValue, setAutohideValue] = useState(3000);
  const [closeButton, setCloseButton] = useState(true);
  const [fade, setFade] = useState(true);
  const [title, setTitle] = useState("");

  const addToast = () => {
    setToasts([
      ...toasts,
      { position, autohide: autohide && autohideValue, closeButton, fade },
    ]);
  };

  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || [];
      toasters[toast.position].push(toast);
      return toasters;
    }, {});
  })();

  const handleDelete = (itemId) => {
    const items = data.filter((item) => item.id !== itemId);
    setData(items);
    alert(JSON.stringify(items));
    setAccess(false);
  };

  const misaJour = () => {
    //alert('mis a jour');
    axios.get("http://localhost:3001/Employe").then((response) => {
      //alert(JSON.stringify(response.data));
      setData(response.data);
    });
  };
  useEffect(() => {
    misaJour();
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Liste des personnels</CCardHeader>
            <CCardBody>
              <ModalNewPersonnel
                showing={false}
                onAdd={misaJour}
                alerter={setAlert}
                setShowAlert={addToast}
                titrer={setTitle}
              />
              {Object.keys(toasters).map((toasterKey) => (
                <CToaster position={toasterKey} key={"toaster" + toasterKey}>
                  {toasters[toasterKey].map((toast, key) => {
                    return (
                      <CToast
                        key={"toast" + key}
                        show={true}
                        autohide={toast.autohide}
                        fade={toast.fade}
                        color={"success"}
                      >
                        <CToastHeader closeButton={toast.closeButton}>
                          {title}
                        </CToastHeader>
                        <CToastBody>{alert}</CToastBody>
                      </CToast>
                    );
                  })}
                </CToaster>
              ))}
              <CDataTable
                onClick={addToast}
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
                scopedSlots={{
                  options: (item) => (
                    <td>
                      <ModalInfo showing={false} employe={item} />
                      <ModalEdit
                        showing={false}
                        access={access}
                        employe={item}
                        onUpdate={misaJour}
                        alerter={setAlert}
                        setShowAlert={addToast}
                        titrer={setTitle}
                      />
                      <ModalHistorique showing={false} nom={item.nom} />
                      <ModalDelete
                        showing={false}
                        nom={item.nom}
                        employe={item}
                        onDelete={misaJour}
                        alerter={setAlert}
                        setShowAlert={addToast}
                        titrer={setTitle}
                      />
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

export default Personnels;
