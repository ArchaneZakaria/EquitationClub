import React, { Fragment, useState } from "react";
import { L10n, setCulture } from "@syncfusion/ej2-base";
import { AuthContext } from 'src/helpers/AuthContext'
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
  Agenda,
  ResourcesDirective,
  ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
import Select from 'react-select';
import { MultiSelect  } from "@syncfusion/ej2-dropdowns";
import { extend, createElement } from "@syncfusion/ej2-base";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const ModalNewSeance = (props) => {
  const role = 1;
  const schema = yup.object().shape({
    titreSeance: yup
      .string()
      .trim()
      .required("Le titre est obligatoire")
      .default("sss"),
    lieuSeance: yup.string().trim().required("Le lieu est obligatoire"),
    dateDebutSeance: yup.string().required("La date de debut est obligatoire"),
    dateFinSeance: yup.string().required("La date de fin est obligatoire"),
    descriptionSeance: yup.string(),
    repetitionSeance: yup.string(),
    freqRepetitionSeance: yup.number(),
    finRepetitionSeance: yup.string(),
    jourFinRepetitionSeance: yup.date(),
    jourRepetitionSeance: yup.number(),
  });

  const { register, handleSubmit, errors, formState, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [large, setLarge] = useState(props.showing);

  const errorMessage = (error) => {
    return <CFormText color="danger">{error}</CFormText>;
  };

  const onSubmit = (data) => {
    if (data) {
      const newLine = {
        Id: 19,
        Subject: data.titreSeance,
        Description: data.descriptionSeance,
        StartTime: new Date(data.dateDebutSeance),
        EndTime: new Date(data.dateFinSeance),
        IsAllDay: false,
        Status: "Completed",
        Priority: "High",
        location: data.lieuSeance,
      };

      props.sum(newLine);
      setLarge(false);
    } else {
      alert("echec");
    }
    reset();
  };
  if (role == 2) {
    return <React.Fragment></React.Fragment>;
  } else {
    return (
      <React.Fragment>
        <CButton
          color="primary"
          onClick={() => setLarge(!large)}
          className="mr-1"
        >
          Nouvelle s??ance
        </CButton>

        <CModal show={large} onClose={setLarge} size="lg">
          <CModalHeader closeButton>
            <CModalTitle>Nouvelle s??ance</CModalTitle>
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
                  <CLabel htmlFor="nom-input">Titre</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le titre de la s??ance"
                    {...register("titreSeance")}
                  />
                  {formState.errors.titreSeance &&
                    errorMessage(formState.errors.titreSeance.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="prenom-input">Lieu</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="text"
                    placeholder="Veuillez saisir le lieu de la s??ance"
                    {...register("lieuSeance")}
                  />
                  {formState.errors.lieuSeance &&
                    errorMessage(formState.errors.lieuSeance.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="email-input">Date de d??but</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="datetime-local"
                    {...register("dateDebutSeance")}
                  />
                  {formState.errors.dateDebutSeance &&
                    errorMessage(formState.errors.dateDebutSeance.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="email-input">Date de fin</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="datetime-local"
                    {...register("dateFinSeance")}
                  />
                  {formState.errors.dateFinSeance &&
                    errorMessage(formState.errors.dateFinSeance.message)}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="prenom-input">Description</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <textarea
                    className="col-md-12"
                    placeholder="Veuillez saisir la description de la s??ance"
                    {...register("descriptionSeance")}
                  ></textarea>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">R??p??ter</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <select
                    className="col-md-12"
                    {...register("repetitionSeance")}
                  >
                    <option value="">Jamais</option>
                    <option value="client">Quotidiennement</option>
                    <option value="employe">Hebdomadairement</option>
                    <option value="employe">Mensuelement</option>
                  </select>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="prenom-input">R??p??ter chaque (jours)</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <input
                    className="col-md-12"
                    type="number"
                    {...register("freqRepetitionSeance")}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Fin</CLabel>
                </CCol>
                <CCol xs="12" md="3">
                  <select
                    className="col-md-12"
                    {...register("finRepetitionSeance")}
                  >
                    <option value="">Jamais</option>
                    <option value="client">Jusqu'a</option>
                    <option value="employe">Nombre</option>
                  </select>
                </CCol>
                <CCol md="0.5">
                  <CLabel htmlFor="select">Le</CLabel>
                </CCol>
                <CCol xs="12" md="2">
                  <input className="col-md-12" type="date" />
                </CCol>
                <CCol md="0,5">
                  <CLabel htmlFor="select">N</CLabel>
                </CCol>
                <CCol xs="12" md="2">
                  <input className="col-md-12" type="number" />
                </CCol>
              </CFormGroup>
              <CButton type="submit" size="sm" color="primary">
                <CIcon name="cil-scrubber" /> Cr??er
              </CButton>
              <CButton type="reset" size="sm" color="danger">
                <CIcon name="cil-ban" /> Annuler
              </CButton>
            </CForm>
          </CModalBody>
          <CModalFooter>
            {" "}
            <CButton color="secondary" onClick={() => setLarge(false)}>
              Fermer
            </CButton>
          </CModalFooter>
        </CModal>
      </React.Fragment>
    );
  }
};


//Selectionner le client


function ClientSeance() {
  const [options,setOptions] =React.useState([
    { value: 'none', label: 'Choisissez un client' },
    { value: 'ARCHANE', label: 'ARCHANE Zakaria' },
    { value: 'LAHIYANE', label: 'LAHIYANE Mehdi' },
    { value: 'BELATAR', label: 'BELATAR Mohammed' },
    { value: 'AOUKACH', label: 'AOUKACH Mehdi' },
    { value: 'RADOUINE', label: 'RADOUINE Ismail' },
  ]);
  const[selectedOption,setSelectedOption]=React.useState({ value: 'none', label: 'Choisissez un employ??' })
  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`);
  };
  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  )
}





const Data = [
  {
    Id: 1,
    Subject: "Entrainement",
    StartTime: new Date("May 11, 2021 08:30:00"),
    EndTime: new Date("May 11, 2021 12:30:00"),
    IsAllDay: false,
    Status: "Completed",
    Priority: "High",
  },
  {
    Id: 2,
    Subject: "Balade",
    StartTime: new Date("2021-05-09 08:30:00"),
    EndTime: new Date("May 9, 2021 10:30:00"),
    IsAllDay: false,
    Status: "Completed",
    Priority: "Low",
    Description: "Balade jenb lwad",
  },
  {
    Id: 3,
    Titre: "Elevage",
    StartTime: new Date("May 22, 2021 08:30:00"),
    EndTime: new Date("May 22, 2021 10:30:00"),
    IsAllDay: false,
    Status: "Completed",
    Priority: "High",
    RecurrenceRule: "FREQ=WEEKLY;INTERVAL=1;COUNT=5",
  },
  {
    Id: 4,
    Titre: "Palfrenage",
    Description: "Meeting to discuss support plan.",
    StartTime: new Date("May 28, 2021 08:30:00"),
    EndTime: new Date("May 28, 2021 10:30:00"),
    IsAllDay: false,
    Status: "Completed",
    Priority: "High",
    RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5",
    Employe: 2,
  },
  {
    Id: 5,
    Titre: "test",
    Description: "siroooo t7awaaaw",
    StartTime: new Date("May 29, 2021 08:30:00"),
    EndTime: new Date("May 29, 2021 10:30:00"),
    IsAllDay: false,
    Status: "Completed",
    Priority: "High",
    RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5",
    Employe: 3,
    RecurrenceID: 7,
  },
  {
    Id: 6,
    Titre: "test",
    Description: "siroooo t7awaaaw",
    StartTime: new Date("May 30, 2021 12:30:00"),
    EndTime: new Date("May 30, 2021 14:30:00"),
    IsAllDay: false,
    Status: "Completed",
    Priority: "High",
    RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5",
    Employe: 3,
  },
  {
    Id: 7,
    Titre: "testBd",
    Location: "sal??",
    StartTime: "2021-05-06T14:00:00.000Z",
    EndTime: "2021-05-06T15:00:00.000Z",
    IsAllDay: false,
    Employe: 1,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;UNTIL=20210626T140000Z",
    RecurrenceException: null,
    RecurrenceID: null,
  },{
    Id: 8,
    Titre: "Entrainement",
    Location: "sal??",
    StartTime: "2021-07-02T09:00:00.000Z",
    EndTime: "2021-07-02T12:00:00.000Z",
    IsAllDay: false,
    Employe: 2,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;UNTIL=20210826T130000Z",
    RecurrenceException: null,
    RecurrenceID: 7,
    Description: "fuck to all",
    
  },{
    Id: 9,
    Titre: "Entrainement",
    Location: "sal??",
    StartTime: "2021-06-30T12:00:00.000Z",
    EndTime: "2021-06-30T15:00:00.000Z",
    IsAllDay: false,
    Employe: 2,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;UNTIL=20210826T130000Z",
    RecurrenceException: null,
    RecurrenceID: 7,
    Description: "fuck to all",
    
  },{
    Id: 10,
    Titre: "Elevage",
    Location: "Sla",
    StartTime: "2021-06-29T12:00:00.000Z",
    EndTime: "2021-06-29T17:00:00.000Z",
    IsAllDay: false,
    Employe: 4,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=FR;INTERVAL=1;UNTIL=20210627T140000Z",
    RecurrenceException: "20210528T110000Z",
    RecurrenceID: 9,
    Description: "rien d'interessant",
  }
];


//// Les r??currences :  https://www.telerik.com/kendo-react-ui/components/scheduler/recurring/

//Le composant principal
L10n.load({
  en: {
    schedule: {
      day: "Jour",
      week: "Semaine",
      workWeek: "Work Week",
      month: "Mois",
      agenda: "Agenda",
      weekAgenda: "Week Agenda",
      workWeekAgenda: "Work Week Agenda",
      monthAgenda: "Month Agenda",
      today: "Aujourd'hui",
      noEvents: "Aucun ??venements",
      emptyContainer: "There are no events scheduled on this day.",
      allDay: "Toute la journ??e",
      start: "D??but",
      end: "Fin",
      more: "Plus",
      close: "Fermer",
      cancel: "Annuler",
      noTitle: "(No Title)",
      delete: "Supprimer",
      deleteEvent: "Supprimer tache",
      deleteMultipleEvent: "Delete Multiple Events",
      selectedItems: "Items selected",
      deleteSeries: "Supprimer le forfait",
      edit: "Edit",
      editSeries: "Modifier le forfait",
      editEvent: "Modifier la tache",
      createEvent: "Cr??er",
      subject: "Sujet",
      addTitle: "Ajouter titre",
      moreDetails: "Plus de d??tails",
      save: "Enregistrer",
      editContent: "Voulez vous supprimez tous les taches de cet employ?? ?",
      deleteRecurrenceContent:
        "Do you want to delete only this event or entire series?",
      deleteContent: "Vous ??tes sur de vouloir supprimer cette tache?",
      deleteMultipleContent:
        "Are you sure you want to delete the selected events?",
      newEvent: "Nouvelle tache",
      title: "Titre",
      location: "Lieu",
      description: "Description",
      timezone: "Fuseau horaire",
      startTimezone: "Start Timezone",
      endTimezone: "End Timezone",
      repeat: "R??peter",
      saveButton: "Enregistrer",
      cancelButton: "Annuler",
      deleteButton: "Supprimer",
      recurrence: "Recurrence",
      wrongPattern: "The recurrence pattern is not valid.",
      seriesChangeAlert:
        "The changes made to specific instances of this series will be cancelled and those events will match the series again.",
      createError:
        "The duration of the event must be shorter than how frequently it occurs. Shorten the duration, or change the recurrence pattern in the recurrence event editor.",
      recurrenceDateValidation:
        "Some months have fewer than the selected date. For these months, the occurrence will fall on the last date of the month.",
      sameDayAlert:
        "Two occurrences of the same event cannot occur on the same day.",
      editRecurrence: "Edit Recurrence",
      repeats: "Repeats",
      alert: "Alert",
      startEndError: "La date de fin est invalide.",
      invalidDateError: "La date saisie est invalide.",
      ok: "Ok",
      occurrence: "Occurrence",
      series: "Series",
      previous: "Previous",
      next: "Next",
      timelineDay: "Timeline Day",
      timelineWeek: "Timeline Week",
      timelineWorkWeek: "Timeline Work Week",
      timelineMonth: "Timeline Month",
      expandAllDaySection: "Expand",
      collapseAllDaySection: "Collapse",
    },
    recurrenceeditor: {
      none: "None",
      daily: "Quotidiennement",
      weekly: "Hebdomadairement",
      monthly: "Mensuelement",
      month: "Mois",
      yearly: "Annuelement",
      never: "Jamais",
      until: "Jusqu'a",
      count: "Nombre",
      first: "Premier",
      second: "Deuxi??me",
      third: "Troisieme",
      fourth: "Quatri??me",
      last: "Dernier",
      repeat: "R??p??ter",
      repeatEvery: "R??p??ter chaque",
      on: "R??p??ter dans",
      end: "Fin",
      onDay: "Jour",
      days: "Jour(s)",
      weeks: "Semaine(s)",
      months: "Mois(s)",
      years: "Ann??e(s)",
      every: "Chaque",
      summaryTimes: "fois",
      summaryOn: "dans",
      summaryUntil: "Jusqu'a",
      summaryRepeat: "R??p??ter",
      summaryDay: "jour(s)",
      summaryWeek: "semaine(s)",
      summaryMonth: "mois(s)",
      summaryYear: "ann??e(s)",
    },
  },
});
setCulture("en");

class Tache extends React.Component {
  static contextType=AuthContext;
  constructor() {
    super(...arguments);
    {
      /*const [data,setData]=React.useState(Data)*/
    }
    if(this.context.utilisateur.roleUtilisateur==2){
      this.autorise=true;
    }else{
      this.autorise=false;
    }
    this.scheduleObj = React.createRef();
    this.data = Data;
    this.state = { show: false };
    this.prioriteData = [
      { priorite: "Forte", id: 1, color: "#ea7a57" },
      { priorite: "Moyenne", id: 2, color: "#7fa900" },
      { priorite: "Faible", id: 3, color: "#5978ee" },
    ];
    this.employeData = [
      { nomClient: "ARCHANE Zakaria", idClient: 1, color: "#1aaa55" },
      { nomClient: "LAHYANE Mehdi", idClient: 2, color: "#7fa900" },
      { nomClient: "BELATAR Jamal", idClient: 3, color: "#7fa902" },
      { nomClient: "ZAYTI Hamid", idClient: 4, color: "#77a900" },
      { nomClient: "KOLOBAN Jaban", idClient: 5, color: "#7fa900" },
      { nomClient: "BAKARI Kon??", idClient: 6, color: "#7fa900" },
      { nomClient: "TOTTI Francesco", idClient: 7, color: "#7fa900" },
      { nomClient: "TEVEZ Carlos", idClient: 8, color: "#7fa900" },
      { nomClient: "BOUGHANEM Youssef", idClient: 9, color: "#7fa900" },
      { nomClient: "JOBS Steve", idClient: 10, color: "#7fa900" },
      { nomClient: "MASK Elon", idClient: 11, color: "#7fa900" },
      { nomClient: "DINERO Macha", idClient: 12, color: "#7fa900" },
      { nomClient: "KOLOBAN Jaban", idClient: 13, color: "#7fa900" },
    ];
  }
  onEventClick(args) {
    let event = this.scheduleObj.getEventDetails(args.element);
    //alert(JSON.stringify(event));
  }

  onActionBegin(args) {
    if (
      args.requestType === "eventCreate" ||
      args.requestType === "eventChange"
    ) {
      let data;
      if (args.requestType === "eventCreate") {
        data = args.data[0];
        {
            /* alert(JSON.stringify(args.data));*/
      }
      } else if (args.requestType === "eventChange") {
        data = args.data;
        {
        /*alert(JSON.stringify(args.data));*/
      }
      }
      {
        /*if (!this.scheduleObj.isSlotAvailable(data)) {
                args.cancel = true;
            }*/
      }
    }
  }

  onActionComplete(args) {
    //alert(JSON.stringify(args.data));
  }
  onPopupOpen(args) {
/*
    if (args.type === "Editor") {
      if (!args.element.querySelector(".custom-field-row")) {
        let row = createElement("div", { className: "custom-field-row" });
        let formElement = args.element.querySelector(".e-schedule-form");
        formElement.firstChild.insertBefore(
          row,
          formElement.firstChild.firstChild
        );
        let container = createElement("div", {
          className: "custom-field-container",
        });
        let inputEle = createElement("input", {
          className: "e-field",
          attrs: { name: "EventType" },
        });
        container.appendChild(inputEle);
        row.appendChild(container);
        let drowDownList = new MultiSelect({
          dataSource: [
            { text: "Entrainement", value: "public-event" },
            { text: "Balade", value: "maintenance" },
            { text: "Saut d'obstacle", value: "commercial-event" },
          ],
          fields: { text: "text", value: "value" },
          value: args.data.EventType,
          floatLabelType: "Always",
          placeholder: "Type de s??ance",
          
        });
        drowDownList.appendTo(inputEle);
        inputEle.setAttribute("name", "EventType");
      }
    }*/
  }

  onAddClick(row) {
    this.scheduleObj.addEvent(row);
    alert('dsdsd')
  }

  render() {
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Liste des taches</CCardHeader>
            <CCardBody>
              {/*<ModalNewSeance showing={this.state.show} sum={this.onAddClick.bind(this)}/>*/}
              <ClientSeance/>
              <ScheduleComponent
                cssClass="timeline-resource"
                ref={(t) => (this.scheduleObj = t)}
                eventSettings={{
                  dataSource: this.data,
                  enableTooltip: true,
                  fields: {
                    id: "Id",
                    subject: { name: "Titre" },
                    isAllDay: { name: "IsAllDay" },
                    startTime: { name: "StartTime" },
                    endTime: { name: "EndTime" },
                    EventType: { name: "EventType" },
                  },
                }}
                eventClick={this.onEventClick.bind(this)}
                actionBegin={this.onActionBegin.bind(this)}
                actionComplete={this.onActionComplete.bind(this)}
                sameDayAlert={false}
                firstDayOfWeek={1}
                startHour={"08:00"}
                endHour={"19:00"}
                readonly={this.autorise}
                timezone={"FR"}
                showHeaderBar={true}
                timeScale={{ interval: 60, slotCount: 1 }}
                group={{ byGroupID: false, resources: ['Employe'] }}
                popupOpen={this.onPopupOpen.bind(this)}
              >
                <ResourcesDirective>
                  <ResourceDirective
                    field="Employe"
                    title="Employe"
                    name="Employe"
                    allowMultiple={true}
                    dataSource={this.employeData}
                    textField="nomClient"
                    idField="idClient"
                    colorField="color"
                  ></ResourceDirective>
                </ResourcesDirective>

                <Inject services={[Day, Week, Month, Agenda]}></Inject>
              </ScheduleComponent>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    );
  }
}

export default Tache;
