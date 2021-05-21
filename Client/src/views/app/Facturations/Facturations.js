import React, { useState } from "react";
import { CChartPie } from "@coreui/react-chartjs";
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
} from "@fortawesome/free-solid-svg-icons";
import historyData from "../personnels/HistoryData";
import detailsHistory from "../personnels/detailsHistory";

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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import factData from "./FactData";
const fieldsHistory = [
  {
    key: "show_details",
    label: "",
    _style: { width: "15%" },
    sorter: false,
    filter: false,
  },
];
const fieldsFact = [
  { key: "nom", _style: { width: "15%" } },
  { key: "prenom", _style: { width: "15%" } },
  { key: "datePayement", _style: { width: "15%" } },
  { key: "montant", _style: { width: "22.5%" } },
  { key: "typePayement", _style: { width: "12.5%" } },
];

const ModalHistorique = (props) => {
  const [data, setData] = useState(factData);
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
      <CCard show={modal} onClose={setModal} size="lg">
        <CCardHeader closeButton>
          <CCardTitle>Facturations</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CTabs activeTab="Liste des Facturations">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink data-tab="Liste des facturations">
                  Facturations Payé
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="FacturationsPaye">
                  Facturations non payé
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="Liste des facturations">
                <CDataTable
                  tableFilter
                  clickableRows
                  items={factData}
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
                          <CCardTitle>Inscriptions</CCardTitle>
                          <CButton
                            size="sm"
                            shape="pill"
                            color="secondary"
                            className=""
                            title="Liste inscriptions"
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
                              fields={fieldsFact}
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
              <CTabPane data-tab="FacturationsPaye">
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
        </CCardBody>
        <CCardFooter>
          <CButton color="secondary" onClick={() => setModal(false)}>
            Fermer
          </CButton>
        </CCardFooter>
      </CCard>
    </React.Fragment>
  );
};

export default ModalHistorique;
