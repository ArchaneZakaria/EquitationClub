import React, { useState } from "react";
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
  CFormText,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";

import chevauxData from "../chevaux/ChevauxData";

import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};
const fields = [
  "nom",
  "DateNaissance",
  "DateAcces",
  "Paddock",
  "Race",
  "Etat De santé",
  "Options",
];

const ModalDelete = (props) => {
  const deleting = () => {
    props.onDelete(props.id);
    setModal(!modal);
  };
  const [modal, setModal] = React.useState(props.showing);
  return (
    <React.Fragment>
      <FontAwesomeIcon
        icon={faTrashAlt}
        onClick={() => {
          setModal(!modal);
        }}
      />
      <CModal show={modal} onClose={setModal}>
        <CModalHeader closeButton>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisiRaceg elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={deleting}>
            DELETE
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
  return (
    <React.Fragment>
      <FontAwesomeIcon icon={faInfoCircle} onClick={() => setModal(!modal)} />
      <CModal show={modal} onClose={setModal}>
        <CModalHeader closeButton>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisiRaceg elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">{props.nom}</CButton>{" "}
          <CButton color="secondary" onClick={() => setModal(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};

const ModalNewPersonnel = (props) => {
  const schema = yup.object().shape({
    nom: yup.string().required("Le nom est obligatoire"),
    DateNaissance: yup.date().required("La date de Naissance est obligatoire"),
    DateAcces: yup.date().required("La Date est obligatoire"),
    Paddock: yup.string(),
    Race: yup.string().required("La Race est obligatoire"),
    EtatDeSante: yup.string().required("Etat de santé obligatoire"),
    Status: yup.string().required("Disponible ou non"),
  });

  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const [large, setLarge] = useState(props.showing);

  const errorMessage = (error) => {
    return <CFormText color="danger">{error}</CFormText>;
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  return (
    <React.Fragment>
      <CButton
        color="primary"
        onClick={() => setLarge(!large)}
        className="mr-1"
      >
        Nouveau cheval{" "}
      </CButton>

      <CModal show={large} onClose={setLarge} size="lg">
        <CModalHeader closeButton>
          <CModalTitle>Ajouter un nouveau cheval</CModalTitle>
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
                  placeholder="Veuillez saisir le nom du Cheval"
                  {...register("nom")}
                />
                {formState.errors.nom &&
                  errorMessage(formState.errors.nom.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="Race-input">Race</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir le Race"
                  {...register("Race")}
                />
                {formState.errors.Race &&
                  errorMessage(formState.errors.Race.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="DateNaissance-input">
                  Date de naissance
                </CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="date"
                  {...register("DateNaissance")}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="DateAcces-input">Date d'accés</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="date"
                  placeholder="Veuillez La date d'acces du cheval"
                  {...register("DateAcces")}
                />
                {formState.errors.DateAcces &&
                  formState.errors.DateAcces.type === "required" &&
                  errorMessage("Obligatoire")}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="Paddock-input">Numéro Paddock</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="number"
                  placeholder="Veuillez saisir le numéro du Paddock"
                  {...register("Paddock")}
                />
                {formState.errors.Paddock &&
                  errorMessage(formState.errors.Paddock.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="EtatDeSante-input">Etat de Santé</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="text"
                  placeholder="Veuillez saisir l'etat du cheval "
                  {...register("EtatDeSante")}
                />
                {formState.errors.fonction &&
                  errorMessage(formState.errors.fonction.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Status</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <select className="col-md-12" {...register("role")}>
                  <option value="">Please select</option>
                  <option value="disponible">Disponible</option>
                  <option value="disponible">Indisponible </option>
                </select>
              </CCol>
            </CFormGroup>
            <CButton type="submit" size="sm" color="primary">
              <CIcon name="cil-scrubber" /> Créer
            </CButton>
            <CButton type="reset" size="sm" color="danger">
              <CIcon name="cil-ban" /> Annuler
            </CButton>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">{props.nom}</CButton>{" "}
          <CButton color="secondary" onClick={() => setLarge(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};

const Chevaux = () => {
  const [data, setData] = useState(chevauxData);
  const handleDelete = (itemId) => {
    const items = data.filter((item) => item.id !== itemId);
    setData(items);
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Liste des personnels</CCardHeader>
            <CCardBody>
              <ModalNewPersonnel showing={false} />
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
                  Options: (item) => (
                    <td>
                      <ModalInfo showing={false} nom={item.nom} />
                      <ModalDelete
                        showing={false}
                        nom={item.nom}
                        onDelete={handleDelete}
                        id={item.id}
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

export default Chevaux;
