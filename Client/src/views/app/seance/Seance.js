import React, { Fragment, useState }  from 'react'
import * as ReactDOM from 'react-dom';
import { L10n,setCulture} from '@syncfusion/ej2-base';
import {Inject,ScheduleComponent,Day,Week,WorkWeek,Month,Agenda,ResourcesDirective, ResourceDirective,EventSettingsModel} from '@syncfusion/ej2-react-schedule'
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
CRow,
CModal,
CModalBody,
CModalFooter,
CModalHeader,
CModalTitle,
CFormText
} from '@coreui/react'
import CIcon from '@coreui/icons-react'



const ModalNewSeance=(props)=>{
  const role=1;
  const schema=yup.object().shape({
      titreSeance:yup.string().trim().required('Le titre est obligatoire').default('sss'),
      lieuSeance:yup.string().trim().required('Le lieu est obligatoire'),
      dateDebutSeance:yup.string().required('La date de debut est obligatoire'),
      dateFinSeance:yup.string().required('La date de fin est obligatoire'),
      descriptionSeance:yup.string(),
      repetitionSeance:yup.string(),
      freqRepetitionSeance:yup.number(),
      finRepetitionSeance:yup.string(),
      jourFinRepetitionSeance:yup.date(),
      jourRepetitionSeance:yup.number()
    });
  
    const { register, handleSubmit , errors,formState,reset} = useForm({resolver:yupResolver(schema)});

      const [large, setLarge] = useState(props.showing)

      const errorMessage = error => {
          return <CFormText color="danger">{error}</CFormText>
        };

        const onSubmit = (data) => {
          if(data){
            const newLine={
              Id: 19,
              Subject: data.titreSeance,
              Description: data.descriptionSeance,
              StartTime: new Date(data.dateDebutSeance),
              EndTime:  new Date(data.dateFinSeance),
              IsAllDay: false,
              Status: 'Completed',
              Priority: 'High',
              location: data.lieuSeance
            };
            
            props.sum(newLine)
            setLarge(false)
          }else{
            alert('echec')
          }
          reset()
        }; 
        if(role==2){
          return(
            <React.Fragment></React.Fragment>
          )
        }else{
          return(
            <React.Fragment>
                <CButton color="primary" onClick={() => setLarge(!large)} className="mr-1">Nouvelle séance</CButton>
                    
                     <CModal 
                        show={large} 
                        onClose={setLarge}
                        size="lg"
                        >
                        <CModalHeader closeButton>
                            <CModalTitle >Nouvelle séance</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                        <CForm action="#" method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                
                <CFormGroup row>
                        
                  <CCol md="3">
                    <CLabel htmlFor="nom-input">Titre</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir le titre de la séance" {...register("titreSeance")}/>
                  {formState.errors.titreSeance &&errorMessage(formState.errors.titreSeance.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="prenom-input">Lieu</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="text" placeholder="Veuillez saisir le lieu de la séance" {...register("lieuSeance")}/>
                  {formState.errors.lieuSeance  &&errorMessage(formState.errors.lieuSeance.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Date de début</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="datetime-local" {...register("dateDebutSeance")}/>
                  {formState.errors.dateDebutSeance &&errorMessage(formState.errors.dateDebutSeance.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Date de fin</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="datetime-local" {...register("dateFinSeance")}/>
                  {formState.errors.dateFinSeance &&errorMessage(formState.errors.dateFinSeance.message)}
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="prenom-input">Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                 <textarea className="col-md-12" placeholder="Veuillez saisir la description de la séance" {...register("descriptionSeance")}></textarea>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Répéter</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <select className="col-md-12" {...register("repetitionSeance")}>
                        <option value="">Jamais</option>
                          <option value="client">Quotidiennement</option>
                          <option value="employe">Hebdomadairement</option>
                          <option value="employe">Mensuelement</option>
                      </select>
                    </CCol>
                  </CFormGroup> 
                  <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="prenom-input">Répéter chaque (jours)</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <input className="col-md-12" type="number"  {...register("freqRepetitionSeance")}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Fin</CLabel>
                    </CCol>
                    <CCol xs="12" md="3">
                      <select className="col-md-12" {...register("finRepetitionSeance")}>
                        <option value="">Jamais</option>
                          <option value="client">Jusqu'a</option>
                          <option value="employe">Nombre</option>
                      </select>
                    </CCol>
                    <CCol md="0.5">
                      <CLabel htmlFor="select">Le</CLabel>
                    </CCol>
                    <CCol xs="12" md="2">
                    <input className="col-md-12" type="date"/>
                    </CCol>
                    <CCol md="0,5">
                      <CLabel htmlFor="select">N</CLabel>
                    </CCol>
                    <CCol xs="12" md="2">
                    <input className="col-md-12" type="number"/>
                    </CCol>
                  </CFormGroup>
                <CButton type="submit" size="sm" color="primary" ><CIcon name="cil-scrubber"/> Créer</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Annuler</CButton>
              </CForm>
                        </CModalBody>
                        <CModalFooter>
                            {' '}
                            <CButton 
                            color="secondary" 
                            onClick={() => setLarge(false)}
                            >Fermer</CButton>
                        </CModalFooter>
            </CModal>
            </React.Fragment>
                    
    )
  
        }
  
}



const Data=[{
  Id: 1,
  Subject: 'Entrainement',
  StartTime:  new Date('May 11, 2021 08:30:00'),
  EndTime:  new Date('May 11, 2021 12:30:00'),
  IsAllDay: false,
  Status: 'Completed',
  Priority: 'High'
},
{
  Id: 2,
  Subject: 'Balade',
  StartTime:  new Date('2021-05-09 08:30:00'),
  EndTime:  new Date('May 9, 2021 10:30:00'),
  IsAllDay: false,
  Status: 'Completed',
  Priority: 'Low',
  Description:'Balade jenb lwad'
},
{
  Id: 3,
  Titre: 'Elevage',
  StartTime:  new Date('May 22, 2021 08:30:00'),
  EndTime:  new Date('May 22, 2021 10:30:00'),
  IsAllDay: false,
  Status: 'Completed',
  Priority: 'High'
},
{
  Id: 4,
  Subject: 'Palfrenage',
  Description: 'Meeting to discuss support plan.',
  StartTime:  new Date('May 24, 2021 08:30:00'),
  EndTime:  new Date('May 24, 2021 10:30:00'),
  IsAllDay: false,
  Status: 'Completed',
  Priority: 'High',
  CategoryColor: "#fec200",
  priorite:1
}];
//Le composant principal
L10n.load({
  "en": {
      "schedule": {
          "day": "Jour",
          "week": "Semaine",
          "workWeek": "Work Week",
          "month": "Mois",
          "agenda": "Agenda",
          "weekAgenda": "Week Agenda",
          "workWeekAgenda": "Work Week Agenda",
          "monthAgenda": "Month Agenda",
          "today": "Aujourd'hui",
          "noEvents": "Aucun évenements",
          "emptyContainer": "There are no events scheduled on this day.",
          "allDay": "Toute la journée",
          "start": "Début",
          "end": "Fin",
          "more": "Plus",
          "close": "Fermer",
          "cancel": "Annuler",
          "noTitle": "(No Title)",
          "delete": "Supprimer",
          "deleteEvent": "Supprimer séance",
          "deleteMultipleEvent": "Delete Multiple Events",
          "selectedItems": "Items selected",
          "deleteSeries": "Delete Series",
          "edit": "Edit",
          "editSeries": "Edit Series",
          "editEvent": "Modifier la séance",
          "createEvent": "Créer",
          "subject": "Sujet",
          "addTitle": "Ajouter titre",
          "moreDetails": "Plus de détails",
          "save": "Enregistrer",
          "editContent": "Do you want to edit only this event or entire series?",
          "deleteRecurrenceContent": "Do you want to delete only this event or entire series?",
          "deleteContent": "Vous étes sur de vouloir supprimer cette séance?",
          "deleteMultipleContent": "Are you sure you want to delete the selected events?",
          "newEvent": "Nouvelle séance",
          "title": "Titre",
          "location": "Lieu",
          "description": "Description",
          "timezone": "Timezone",
          "startTimezone": "Start Timezone",
          "endTimezone": "End Timezone",
          "repeat": "Répeter",
          "saveButton": "Enregistrer",
          "cancelButton": "Annuler",
          "deleteButton": "Supprimer",
          "recurrence": "Recurrence",
          "wrongPattern": "The recurrence pattern is not valid.",
          "seriesChangeAlert": "The changes made to specific instances of this series will be cancelled and those events will match the series again.",
          "createError": "The duration of the event must be shorter than how frequently it occurs. Shorten the duration, or change the recurrence pattern in the recurrence event editor.",
          "recurrenceDateValidation": "Some months have fewer than the selected date. For these months, the occurrence will fall on the last date of the month.",
          "sameDayAlert": "Two occurrences of the same event cannot occur on the same day.",
          "editRecurrence": "Edit Recurrence",
          "repeats": "Repeats",
          "alert": "Alert",
          "startEndError": "La date de fin est invalide.",
          "invalidDateError": "La date saisie est invalide.",
          "ok": "Ok",
          "occurrence": "Occurrence",
          "series": "Series",
          "previous": "Previous",
          "next": "Next",
          "timelineDay": "Timeline Day",
          "timelineWeek": "Timeline Week",
          "timelineWorkWeek": "Timeline Work Week",
          "timelineMonth": "Timeline Month",
          "expandAllDaySection": "Expand",
          "collapseAllDaySection": "Collapse"
      },
      "recurrenceeditor": {
          "none": "None",
          "daily": "Quotidiennement",
          "weekly": "Hebdomadairement",
          "monthly": "Mensuelement",
          "month": "Mois",
          "yearly": "Annuelement",
          "never": "Jamais",
          "until": "Jusqu'a",
          "count": "Nombre",
          "first": "Premier",
          "second": "Deuxiéme",
          "third": "Troisieme",
          "fourth": "Quatriéme",
          "last": "Dernier",
          "repeat": "Répéter",
          "repeatEvery": "Répéter chaque",
          "on": "Répéter dans",
          "end": "Fin",
          "onDay": "Jour",
          "days": "Jour(s)",
          "weeks": "Semaine(s)",
          "months": "Mois(s)",
          "years": "Année(s)",
          "every": "Chaque",
          "summaryTimes": "fois",
          "summaryOn": "dans",
          "summaryUntil": "Jusqu'a",
          "summaryRepeat": "Répéter",
          "summaryDay": "jour(s)",
          "summaryWeek": "semaine(s)",
          "summaryMonth": "mois(s)",
          "summaryYear": "année(s)"
      }
  }
  });
  setCulture('en');
class Seance extends React.Component{
  constructor() {
    super(...arguments);
    {/*const [data,setData]=React.useState(Data)*/}
    this.scheduleObj = React.createRef();
    this.data=Data
    this.state={show:false}
    this.prioriteData=[
      { priorite: 'Forte', id: 1, color: '#ea7a57'},
      { priorite: 'Moyenne', id: 2, color: '#7fa900'},
      { priorite: 'Faible', id: 3, color: '#5978ee'}
    ]
}


onAddClick(row) {
  
  this.scheduleObj.addEvent(row);
}

render(){
  return(
    <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Liste des séances
            </CCardHeader>
            <CCardBody>
            <ModalNewSeance showing={this.state.show} sum={this.onAddClick.bind(this)}/>
                <ScheduleComponent ref={t => this.scheduleObj = t}  eventSettings={{dataSource:this.data,fields: {
                id: 'Id',
                subject: { name: 'Titre', title: 'Titre' },
                location: { name: 'Lieu', title: 'Lieu' },
                description: { name: 'Description', title: 'Description de la séance' },
                startTime: { name: 'StartTime', title: 'Date de ébut' },
                endTime: { name: 'EndTime', title: 'Date de fin' }
            }}} firstDayOfWeek={1} startHour={'08:00'} endHour={'19:00'}   readonly={false} timezone={'FR'} 
                showHeaderBar={true} timeScale={{ interval: 60, slotCount: 1 }} group={{ enableCompactView: false }}>
                            <ResourcesDirective>
                                    <ResourceDirective field='priorite' title='Priorite Type' name='MeetingRoom' allowMultiple={true} 
                                    dataSource={this.prioriteData} textField='priorite' idField='id' colorField='color'>
                            </ResourceDirective>
                            </ResourcesDirective>
                    <Inject services={[Day,Week,Month,Agenda]}></Inject>
                </ScheduleComponent>
            
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
)
}
}


const Seancwwe=(props)=>{
  const [data,setData]=React.useState(Data)
  const prioriteData=[
    { priorite: 'Forte', id: 1, color: '#ea7a57'},
    { priorite: 'Moyenne', id: 2, color: '#7fa900'},
    { priorite: 'Faible', id: 3, color: '#5978ee'}
];
  const sas=(row)=>{
 {
   /*   this.scheduleObj.addEvent(row);*/} 
    setData(data.push(row))
    
  }

  
return(
    <CRow >
        <CCol>
          <CCard>
            <CCardHeader>
              Liste des séances
            </CCardHeader>
            <CCardBody style={{backgroundColor:"#051612"}}>
            <ModalNewSeance showing={false} sum={sas}/>
            <CButton color="primary" onClick={() => {} }ref={t => this.buttonObj = t} onClick={this.onAddClick.bind(this)} className="mr-1">Nouvelle séance</CButton>
                <ScheduleComponent ref={t => this.scheduleObj = t}  eventSettings={{dataSource:Data}} firstDayOfWeek={1} startHour={'08:00'} endHour={'19:00'} readonly={false} timezone={'MA'} 
                showHeaderBar={true} timeScale={{ interval: 60, slotCount: 1 }} group={{ enableCompactView: false }}>
                            <ResourcesDirective>
                                    <ResourceDirective field='priorite' title='Priorite Type' name='MeetingRoom' allowMultiple={true} 
                                    dataSource={prioriteData} textField='priorite' idField='id' colorField='color'>
                            </ResourceDirective>
                            </ResourcesDirective>
                    <Inject services={[Day,Week,WorkWeek,Month,Agenda]}></Inject>
                </ScheduleComponent>
            
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
)
}

export default Seance