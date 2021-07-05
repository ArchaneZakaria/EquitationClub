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
  CNav,
  CNavItem,
  CNavLink,
  CTabs,
  CTabContent,
  CTabPane,
  CSwitch,
  CCollapse,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CIcon from "@coreui/icons-react";
import detailsHistory from "../personnels/detailsHistory";
import chevauxData from "../chevaux/ChevauxData";
import clientData from "../clients/ClientData";
import historyCheval from "../chevaux/historyCheval";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faEdit,
  faTrashAlt,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

const getBadge = (status) => {
  switch (status) {
    case "Bonne Santé":
      return "success";
    case "Non Vacciné":
      return "secondary";
    case "Besoin Etalonage":
      return "warning";
    case "Mauvaise Santé":
      return "danger";
    default:
      return "primary";
  }
};
const fields = [
  "nom",
  "dateDeNaissance",
  "dateAcces",
  "paddock",
  "race",
  "etatDeSante",
  "Options",
];
const fieldsHistory = [
  { key: "Client", _style: { width: "15%" } },
  { key: "Type", _style: { width: "12.5%" } },
  { key: "Description", _style: { width: "32.5%" } },
  { key: "Date", _style: { width: "12.5%" } },
  { key: "DureeEnH", _style: { width: "12.5%" } },
  { key: "Remarque", _style: { width: "12.5%" } },
];

const ModalHistorique = (props) => {
  const [data, setData] = useState(detailsHistory);
  const [modal, setModal] = React.useState(props.showing);
  const [details, setDetails] = useState([]);

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
          <CModalTitle>Historique du cheval : {props.nom}</CModalTitle>
        </CModalHeader>
        <CModalBody>
                <CDataTable
                  clickableRows
                  items={historyCheval}
                  fields={fieldsHistory}
                  tableFilterValue={props.cheval}
                  hover
                  striped
                  bordered
                  size="sm"
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                  }}
                />
        </CModalBody>
      </CModal>
    </React.Fragment>
  );
};

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
        <CModalBody>Etes-vous de vouloir supprimer le cheval ?</CModalBody>
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
};

const ModalInfo = (props) => {
  const [modal, setModal] = React.useState(props.showing);
  return (
    <React.Fragment>
      <CButton
        size="sm"
        shape="pill"
        color="secondary"
        className=""
        title="Image"
        style={{ position: "relative", float: "left" }}
        onClick={() => {
          setModal(!modal);
        }}
      >
        <FontAwesomeIcon size="sm" icon={faCamera} />
      </CButton>
      <CModal show={modal} onClose={setModal}>
        <CModalHeader closeButton>
          <CModalTitle>Photo</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <img src="https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/MA_00600259_vpf1m0.jpg" className ="horse" alt="Logo" />
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setModal(false)}>
            Fermer
          </CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  );
};

const ModalNewCheval = (props) => {
  const schema = yup.object().shape({
    nom: yup.string().required("Le nom est obligatoire"),
    dateDeNaissance: yup
      .date()
      .required("La date de Naissance est obligatoire"),
    dateAcces: yup.date("La Date est obligatoire").required("La Date est obligatoire"),
    paddock: yup.string(),
    race: yup.string().required("La Race est obligatoire"),
    etatDeSante: yup.string().required("Etat de santé obligatoire"),
    status: yup.string().required("Disponible ou non"),
    clientCheval: yup.string().required("Disponible ou non"),
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
                  {...register("race")}
                />
                {formState.errors.race &&
                  errorMessage(formState.errors.Race.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="dateNaissance-input">Date de naissance</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="date"
                  {...register("dateDeNaissance")}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="dateAcces-input">Date d'accés</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="date"
                  placeholder="Veuillez La date d'acces du cheval"
                  {...register("dateAcces")}
                />
                {formState.errors.DateAcces &&
                  formState.errors.DateAcces.type === "required" &&
                  errorMessage("Obligatoire")}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="paddock-input">Numéro Paddock</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <input
                  className="col-md-12"
                  type="number"
                  placeholder="Veuillez saisir le numéro du Paddock"
                  {...register("paddock")}
                />
                {formState.errors.Paddock &&
                  errorMessage(formState.errors.Paddock.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="etatDeSante-input">Etat de Santé</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <select className="col-md-12" {...register("etatDeSante")}>
                  <option value="">Please select</option>
                  <option value="bonneSante"> Bonne santé</option>
                  <option value="mauvaiseSante">Mauvaise santé </option>
                </select>
                {formState.errors.race &&
                  errorMessage(formState.errors.race.message)}
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Status</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <select className="col-md-12" {...register("status")}>
                  <option value="">Please select</option>
                  <option value="disponible">Disponible</option>
                  <option value="indisponible">Indisponible </option>
                </select>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="select">Client</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <select className="col-md-12" {...register("clientCheval")}>
                  <option value="Choisissez le client">
                    Choisissez un Client
                  </option>
                  {clientData.map((item) => (
                    <option value={item.nom}>
                      {item.nom + " " + item.prenom}
                    </option>
                  ))}
                </select>
              </CCol>
            </CFormGroup>
            <CButton
              onClick={() => setLarge(false)}
              size="sm"
              color="danger"
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
};
const ModalEditCheval = (props) => {
  const [nom, setNom] = React.useState(props.cheval.nom);
  const [status, setStatus] = React.useState(props.cheval.status);
  const [etatDeSante, setEtatDesante] = React.useState(
    props.cheval.etatDeSante
  );
  const [race, setRace] = React.useState(props.cheval.race);
  const [clientCheval, setClientCheval] = React.useState(
    props.cheval.clientCheval
  );
  const [dateDeNaissance, setDateDeNaissance] = React.useState("");
  const [dateAcces, setDateAcces] = React.useState("");

  const schema = yup.object().shape({
    nom: yup.string().trim().required("Le nom est obligatoire").default("sss"),
    race: yup.string().trim().required("Le race est obligatoire"),
    dateDeNaissance: yup
      .date()
      .required("La date de Naissance est obligatoire"),
    dateAcces: yup.date().required("La Date est obligatoire"),
    paddock: yup
      .number()
      .max(15)
      .required("Le numéro du Paddock est obligatoire"),
    etatDeSante: yup.string("choisissez un champ!"),
    status: yup.string().trim().required("Le status est obligatoire"),
    clientCheval: yup
      .string()
      .required("Le numero de dateAcces est obligatoire"),
  });
  if (props.cheval.nom != nom) {
    setNom(props.cheval.nom);
    setRace(props.cheval.race);
    setClientCheval(props.cheval.clientCheval);
  }
  React.useEffect(() => {
    setValue("nom", nom);
    setValue("race", race);
    setValue("dateDeNaissance", dateDeNaissance);
    setValue("dateAcces", dateAcces);
    setValue("status", status);
    setValue("etatDeSante", etatDeSante);
    setValue("clientCheval", clientCheval);
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
  if (!props.cheval) {
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
              Modifier le cheval : {nom} {props.cheval.race}
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
                  />
                  {formState.errors.nom &&
                    errorMessage(formState.errors.nom.message)}
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="race-input">Race</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le race"
                    {...register("race")}
                  />
                  {formState.errors.race &&
                    errorMessage(formState.errors.race.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="dateDeNaissance-input">
                    Date de naissance{" "}
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="date"
                    placeholder="Veuillez saisir la date de naissance"
                    {...register("dateDeNaissance")}
                  />
                  {formState.errors.dateDeNaissance &&
                    errorMessage(formState.errors.dateDeNaissance.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="dateAcces-input">Date d'acces</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="date"
                    placeholder="Veuillez saisir la date d'accés"
                    {...register("dateAcces")}
                  />
                  {formState.errors.dateAcces &&
                    errorMessage(formState.errors.dateAcces.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="paddock-input">Paddock</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="number"
                    placeholder="Veuillez saisir le numéro du paddock"
                    {...register("paddock")}
                  />
                  {formState.errors.paddock &&
                    errorMessage(formState.errors.paddock.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="etatDeSante-input">Etat de Santé</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <select
                    className="col-md-12"
                    required
                    {...register("etatDeSante")}
                  >
                    <option value="">Veuillez choisir l'etat du cheval</option>
                    <option value="bonneSante"> Bonne santé</option>
                    <option value="mauvaiseSante">Mauvaise santé </option>
                  </select>
                  {formState.errors.race &&
                    errorMessage(formState.errors.race.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Status</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <select
                    className="col-md-12"
                    required
                    {...register("status")}
                  >
                    <option value="">Veuillez choisir le status</option>
                    <option value="disponible">Disponible</option>
                    <option value="indisponible">Indisponible </option>
                  </select>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Client</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <select
                    className="col-md-12"
                    required
                    {...register("clientCheval")}
                  >
                    <option value="">Veuillez choisir un client</option>

                    {clientData.map((item) => (
                      <option value={item.nom}>
                        {item.nom + " " + item.prenom}
                      </option>
                    ))}
                  </select>
                </CCol>
              </CFormGroup>
              <CButton
                className="Boutton"
                size="sm"
                color="danger"
                onClick={() => setLarge(false)}
              >
                <CIcon name="cil-ban" /> Annuler
              </CButton>
              <CButton
                className="Boutton"
                type="submit"
                size="sm"
                color="primary"
              >
                <CIcon name="cil-scrubber" /> Modifier
              </CButton>
            </CForm>
          </CModalBody>
        </CModal>
      </React.Fragment>
    );
  }
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
            <CCardHeader>Liste des chevaux</CCardHeader>
            <CCardBody>
              <ModalNewCheval showing={false} />
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
                      <ModalEditCheval cheval={item} />
                      <ModalHistorique showing={false} nom={item.nom} cheval={item.cheval} />
                      <ModalDelete
                        showing={false}
                        nom={item.nom}
                        onDelete={handleDelete}
                        id={item.id}
                      />

                    </td>
                  ),
                  etatDeSante: (item) => (
                    <td>
                      <CBadge color={getBadge(item.etatDeSante)}>
                        {item.etatDeSante}
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

export default Chevaux;
