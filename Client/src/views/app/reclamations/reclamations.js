import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { reclamationsData } from "./reclamationsData";
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
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import CIcon from "@coreui/icons-react";
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCardBody,
  CTabs,
  CButton,
  CCardTitle,
  CDataTable,
  CCollapse,
  CContainer,
  CCard,
  CCardHeader,
  CRow,
  CFade,
  CModal,
  CFormText,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormGroup,
  CLabel,
  CModalFooter,
  CLink,
} from "@coreui/react";
const fieldsReclamations = [
  { key: "nom", _style: { width: "15%" } },
  { key: "prenom", _style: { width: "15%" } },
  { key: "email", _style: { width: "15%" } },
  { key: "date", _style: { width: "15%" } },
  { key: "sujet", _style: { width: "15%" } },
  { key: "message", _style: { width: "22%" } },
];
const ModalInfo = (props) => {
  const [modal, setModal] = React.useState(props.showing);
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
        <FontAwesomeIcon size="sm" icon={faExternalLinkAlt} />
      </CButton>
      <CModal show={modal} onClose={setModal}>
        <CModalHeader closeButton>
          <CModalTitle>
            Message le {props.date} par {props.nom} {props.prenom}{" "}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>{props.message}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModal(false)}>
            Fermer
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};
const ModalCollapse = (props) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [showCard, setShowCard] = React.useState(true);

  return (
    <CRow>
      <CCol xs="12" sm="6" md="4">
        <br></br>
        <CFade in={showCard}>
          <CCard>
            <CCardHeader>
              {props.item.nom} {props.item.prenom}
              <div className="card-header-actions">
                <CLink
                  className="card-header-action"
                  onClick={() => {
                    setCollapsed(!collapsed);
                  }}
                >
                  <CIcon name={1 ? "cil-chevron-bottom" : "cil-chevron-top"} />
                </CLink>
                <CLink
                  className="card-header-action"
                  onClick={() => setShowCard(false)}
                >
                  <CIcon name="cil-x-circle" />
                </CLink>
              </div>
            </CCardHeader>
            <CCollapse show={collapsed}>
              <CCardBody>{props.item.message}</CCardBody>
            </CCollapse>
          </CCard>
        </CFade>
      </CCol>
    </CRow>
  );
};
const ModalReclamations = (props) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const [showCard, setShowCard] = React.useState(true);
  const [accordion, setAccordion] = useState(0);
  const [modal, setModal] = React.useState(props.showing);
  const [reclaData, setReclaData] = useState(reclamationsData);
  const schema = yup.object().shape({
    nom: yup.string().trim().required("Le nom est obligatoire").default("sss"),
    prenom: yup.string().trim().required("Le prenom est obligatoire"),
    email: yup
      .string()
      .trim()
      .email("L'email est incorrect")
      .required("L'email est obligatoire"),
    sujet: yup.string().trim().required("Le prenom est obligatoire"),
    date: yup.date().required("Le numero de telephone est obligatoire"),
    message: yup.string().required("La fonction est obligatoire"),
  });
  const { register, handleSubmit, errors, formState, setValue } = useForm({
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
      <CCard show={modal} onClose={setModal} size="lg">
        <CCardHeader closeButton>
          <CCardTitle>Réclamations</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CTabs activeTab="1">
            <CNav variant="pills">
              <CNavItem>
                <CNavLink data-tab="1">Liste des réclamations</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="2">Envoyer Réclamation</CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="1">
                <CCard>
                  <CRow >
                    {reclamationsData.map((item, index) => (
                      <CCol lg={4} >
                      <ModalCollapse item={item} /></CCol>
                    ))}
                  </CRow>
                </CCard>
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="2">
                <CForm
                  action="#"
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {" "}
                  <CRow>
                    <CCol xl="12">
                      <CCard>
                        <CCardBody>
                          <CCard className="mb-0">
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
                                <CLabel htmlFor="prenom-input">Prenom</CLabel>
                              </CCol>
                              <CCol xs="12" md="9">
                                <input
                                  className="col-md-12"
                                  type="text"
                                  placeholder="Veuillez saisir le prenom"
                                  {...register("prenom")}
                                />
                                {formState.errors.prenom &&
                                  errorMessage(formState.errors.prenom.message)}
                              </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel htmlFor="email-input">
                                  Adresse email
                                </CLabel>
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
                                <CLabel htmlFor="sujet-input">Sujet</CLabel>
                              </CCol>
                              <CCol xs="12" md="9">
                                <input
                                  className="col-md-12"
                                  type="text"
                                  placeholder="Veuillez saisir le sujet de la reclamation"
                                  {...register("sujet")}
                                />
                                {formState.errors.sujet &&
                                  errorMessage(
                                    formState.errors.password.message
                                  )}
                              </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel htmlFor="message-input">Message</CLabel>
                              </CCol>
                              <CCol xs="12" md="9">
                                <textarea
                                  id="message"
                                  name="message"
                                  rows="4"
                                  cols="50"
                                  {...register("message")}
                                ></textarea>
                                {formState.errors.message &&
                                  formState.errors.message.type ===
                                    "required" &&
                                  errorMessage("le message est obligatoire")}
                              </CCol>
                            </CFormGroup>
                          </CCard>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>{" "}
                  <CButton
                    className="Boutton"
                    type="reset"
                    size="sm"
                    color="danger"
                  >
                    <CIcon name="cil-ban" /> Vider les champs
                  </CButton>
                  <CButton
                    className="Boutton"
                    type="submit"
                    size="sm"
                    color="primary"
                  >
                    <CIcon name="cil-scrubber" /> Envoyer
                  </CButton>
                </CForm>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </React.Fragment>
  );
};
export default ModalReclamations;
