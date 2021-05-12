import React, { Fragment, useState }  from 'react'
import * as ReactDOM from 'react-dom';
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
  Subject: 'Elevage',
  StartTime:  new Date('May 14, 2021 08:30:00'),
  EndTime:  new Date('May 14, 2021 10:30:00'),
  IsAllDay: false,
  Status: 'Completed',
  Priority: 'High'
},
{
  Id: 4,
  Subject: 'Palfrenage',
  Description: 'Meeting to discuss support plan.',
  StartTime:  new Date('May 14, 2021 08:30:00'),
  EndTime:  new Date('May 14, 2021 10:30:00'),
  IsAllDay: false,
  Status: 'Completed',
  Priority: 'High',
  CategoryColor: "#fec200",
  priorite:1
}];
//Le composant principal

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
                <ScheduleComponent ref={t => this.scheduleObj = t}  eventSettings={{dataSource:this.data}} firstDayOfWeek={1} startHour={'08:00'} endHour={'19:00'} readonly={false} timezone={'MA'} 
                showHeaderBar={true} timeScale={{ interval: 60, slotCount: 1 }} group={{ enableCompactView: false }}>
                            <ResourcesDirective>
                                    <ResourceDirective field='priorite' title='Priorite Type' name='MeetingRoom' allowMultiple={true} 
                                    dataSource={this.prioriteData} textField='priorite' idField='id' colorField='color'>
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
                <ScheduleComponent ref={t => this.scheduleObj = t}  eventSettings={{dataSource:Data}} firstDayOfWeek={1} startHour={'08:00'} endHour={'19:00'} readonly={true} timezone={'MA'} 
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