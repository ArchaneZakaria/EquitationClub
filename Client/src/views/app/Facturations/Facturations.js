import React, { useState } from "react";
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
  CCardFooter,
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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { faBookMedical, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import {
  factDataInscription,
  factDataAssurance,
  factDataForfait,
  factDataPaye,
} from "./FactData";

const fieldsFactInscription = [
  { key: "nom", _style: { width: "15%" } },
  { key: "prenom", _style: { width: "15%" } },
  { key: "dateInscription", _style: { width: "15%" } },
  { key: "montant", _style: { width: "15%" } },
  { key: "options", _style: { width: "22%" } },

];
const fieldsFactAssurance = [
  { key: "nom", _style: { width: "15%" } },
  { key: "prenom", _style: { width: "15%" } },
  { key: "dateAssurance", _style: { width: "15%" } },
  { key: "societeAssurance", _style: { width: "15%" } },
  { key: "montant", _style: { width: "15%" } },
  { key: "options", _style: { width: "22%" } },
];
const fieldsFactForfait = [
  { key: "nom", _style: { width: "15%" } },
  { key: "prenom", _style: { width: "15%" } },
  { key: "dateForfait", _style: { width: "15%" } },
  { key: "typeForfait", _style: { width: "15%" } },
  { key: "montant", _style: { width: "15%" } },
  { key: "options", _style: { width: "15%" } },

];
const fieldsFactPaye = [
  { key: "nom", _style: { width: "15%" } },
  { key: "prenom", _style: { width: "15%" } },
  { key: "datePayement", _style: { width: "15%" } },
  { key: "typeFacture", _style: { width: "15%" } },
  { key: "montant", _style: { width: "15%" } },
];
const ModalPayement = (props) => {
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
      .number()
      .min(1, "Le montant doit etre supérieur à zero.")
      .required("Le montant est obligatoire"),
    typePaiement: yup.string().required("Liquide/Cheque/CarteBanquaire"),
  });
  const defaults = {
    dateDebut: props.client.nom,
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
          title="Payer"
          style={{ position: "relative", float: "left" }}
          onClick={() => setLarge(!large)}
        >
          <FontAwesomeIcon size="sm" icon={faDollarSign} />
        </CButton>
        <CModal show={large} onClose={setLarge} size="lg">
          <CModalHeader closeButton>
            <CModalTitle>
              Payer Facture : {props.client.nom} {props.client.prenom}
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
                  <CLabel htmlFor="select">Type Paiement</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <select className="col-md-12" {...register("typePaiement")}>
                    <option value="">Choisissez le Type du Paiement</option>
                    <option value="liquide">Liquide</option>
                    <option value="cheque">Cheque </option>
                    <option value="carteBanquaire">Virement</option>
                  </select>
                </CCol>
              </CFormGroup>
              <CButton  size="sm" color="danger" className="Boutton" onClick={() => setLarge(false)} >
                <CIcon name="cil-ban" /> Annuler
              </CButton>
              <CButton type="submit" size="sm" color="primary" className="Boutton" onClick={() => typePaiement=="Liquide"? alert("Payement effectué"):alert("Payement effectué")}>
                <CIcon name="cil-scrubber" /> Payer
              </CButton>
              
            </CForm>
          </CModalBody>

        </CModal>
      </React.Fragment>
    );
  }
};
const ModalHistorique = (props) => {
  const [inscriData, setInscriData] = useState(factDataInscription);
  const [assurData, setAssurData] = useState(factDataAssurance);
  const [forfaitData, setForfaitData] = useState(factDataForfait);
  const [payeData, setpayeData] = useState(factDataPaye);

  const [modal, setModal] = React.useState(props.showing);
  const [details, setDetails] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [accordion, setAccordion] = useState(0);
  const [fade, setFade] = useState(true);

  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice();
    switch (type) {
      case "left":
        newCollapse[0] = !collapseMulti[0];
        break;
      case "right":
        newCollapse[1] = !collapseMulti[1];
        break;
      case "both":
        newCollapse[0] = !collapseMulti[0];
        newCollapse[1] = !collapseMulti[1];
        break;
      default:
    }
    setCollapseMulti(newCollapse);
  };

  const toggleFade = () => {
    setFade(!fade);
  };

  return (
    <React.Fragment>
      <CCard show={modal} onClose={setModal} size="lg">
        <CCardHeader closeButton>
          <CCardTitle>Paiements</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CTabs activeTab="1">
            <CNav variant="pills">
              <CNavItem>
                <CNavLink data-tab="1">
                  Liste des paiements à régler
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="2">Liste des paiements effectué</CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="1">
                <CRow>
                  <CCol xl="12">
                    <CCard>
                      <CCardBody>
                        <div id="accordion">
                          <CCard className="mb-0">
                            <CCardHeader id="headingOne">
                              <CButton
                                block
                                color="link"
                                className="text-left m-0 p-0"
                                onClick={() =>
                                  setAccordion(accordion === 0 ? null : 0)
                                }
                              >
                                <h5 className="m-2 p-0">
                                  Inscription
                                </h5>
                              </CButton>
                            </CCardHeader>
                            <CCollapse show={accordion === 0}>
                              <CCardBody>
                                <CRow>
                                  <CCol>
                                    <CCard>
                                      <CCardBody>
                                        <CDataTable
                                          tableFilter
                                          clickableRows
                                          items={inscriData}
                                          fields={fieldsFactInscription}
                                          hover
                                          striped
                                          bordered
                                          size="sm"
                                          itemsPerPage={10}
                                          pagination
                                          scopedSlots={{
                                            options: (item) => (
                                              <td>
                                                <ModalPayement
                                                  client={item}
                                                  showing={false}
                                                />
                                              </td>
                                            ),
                                          }}
                                        />
                                      </CCardBody>
                                    </CCard>
                                  </CCol>
                                </CRow>
                              </CCardBody>
                            </CCollapse>
                          </CCard>
                          <CCard className="mb-0">
                            <CCardHeader id="headingTwo">
                              <CButton
                                block
                                color="link"
                                className="text-left m-0 p-0"
                                onClick={() =>
                                  setAccordion(accordion === 1 ? null : 1)
                                }
                              >
                                <h5 className="m-2 p-0">Forfait</h5>
                              </CButton>
                            </CCardHeader>
                            <CCollapse show={accordion === 1}>
                              <CCardBody>
                                <CRow>
                                  <CCol>
                                    <CCard>
                                      <CCardBody>
                                        <CDataTable
                                          tableFilter
                                          clickableRows
                                          items={forfaitData}
                                          fields={fieldsFactForfait}
                                          hover
                                          striped
                                          bordered
                                          size="sm"
                                          itemsPerPage={10}
                                          pagination
                                          scopedSlots={{
                                            options: (item) => <td>
                                              <ModalPayement
                                                  client={item}
                                                  showing={false}
                                                />
                                            </td>,
                                          }}
                                        />
                                      </CCardBody>
                                    </CCard>
                                  </CCol>
                                </CRow>
                              </CCardBody>
                            </CCollapse>
                          </CCard>
            
                        </div>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="2">
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardBody>
                        <CDataTable
                          tableFilter
                          clickableRows
                          items={payeData}
                          fields={fieldsFactPaye}
                          hover
                          striped
                          bordered
                          size="sm"
                          itemsPerPage={10}
                          pagination
                          scopedSlots={{
                            options: (item) => <td></td>,
                          }}
                        />
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </React.Fragment>
  );
};

export default ModalHistorique;
