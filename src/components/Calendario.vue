<template>
	<div id="app">
		<div class="calendar-controls">
			<div v-if="message" class="notification is-success">{{ message }}</div>

			<div class="box">
				<h3 class="title is-5">
					Calendario
				</h3>


				<div class="field">
					<label class="label">Vista por: </label>
					<div class="control">
						<div class="select">
							<select v-model="displayPeriodUom">
								<option value="month">Mes</option>
								<option value="week">Semana</option>
								<option value="year">Año</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<div class="box">
				<div class="field">
					<h4>Ver por</h4>
					<select v-model="tipoBusqueda">
						<option @click="cargarDatos" selected value="Pr">Protocolos</option>
						<option @click="cargarDatos" value="Pa">Pacientes</option>
						<option value="Dc">Doctores</option>
					</select>
				</div>
			</div>

			<div class="box">
				<div class="field">
					<h4>Busqueda</h4>
					<div class="control">
                    <input v-model="nombre" v-on:keypress="recon" type="text" autocomplete="off" v-bind="state" @input="filterStates" class="form-control valid barraBusqueda">
					</div>
				</div>
			</div>
			<div>
                <ul class="list">
                    <li v-for="(filt, index) in filteredStates" :key="index" @click="buscaData(filt)"> {{filt}} </li>
                </ul>
            </div>
		</div>

		<div class="calendar-parent">
			<calendar-view
				:items="items"
				:show-date="showDate"
				:time-format-options="{ hour: 'numeric', minute: '2-digit' }"
				:enable-drag-drop="true"
				:disable-past="disablePast"
				:disable-future="disableFuture"
				:show-times="showTimes"
				:date-classes="myDateClasses"
				:display-period-uom="displayPeriodUom"
				:display-period-count="displayPeriodCount"
				:starting-day-of-week="startingDayOfWeek"
				:class="themeClasses"
				:period-changed-callback="periodChanged"
				:current-period-label="useTodayIcons ? 'icons' : ''"
				:displayWeekNumbers="displayWeekNumbers"
				:enable-date-selection="true"
				:selection-start="selectionStart"
				:selection-end="selectionEnd"
				@date-selection-start="setSelection"
				@date-selection="setSelection"
				@date-selection-finish="finishSelection"
				@drop-on-date="onDrop"
				@click-date="onClickDay"
				@click-item="onClickItem"
			>
				<template #header="{ headerProps }">
					<calendar-view-header :header-props="headerProps" @input="setShowDate" />
				</template>
			</calendar-view>
		</div>
	</div>
</template>
<script>
	// Load CSS from the published version
	import "vue-simple-calendar/dist/style.css"
	import "vue-simple-calendar/static/css/default.css"
	import "vue-simple-calendar/static/css/holidays-us.css"
	// Load CSS from the local repo
	//require("../../vue-simple-calendar/static/css/default.css")
	//require("../../vue-simple-calendar/static/css/holidays-us.css")
	import { CalendarView, CalendarViewHeader, CalendarMath } from "vue-simple-calendar" // published version
	//} from "../../vue-simple-calendar/src/components/bundle.js" // local repo
	//Para traer los protocolos
	import { consultarProtocolosRex, consultarProtocolo } from '../services/ProtocoloServices';
    import { consultarProtocoloNom } from '../services/ProtocoloServices';
    //import { Protocolo } from '../interfaces/Protocolos';
	//Para los pacientes
	import { consultarPacienteNom } from '../services/PacienteServices'
    import { consultarPacientesRex } from '../services/PacienteServices'
    import { consultarPaciente } from '../services/PacienteServices'
	//import { Paciente } from '../interfaces/Paciente';
	//Para traer las citas
	import { obtenerCitasProtocolo } from '../services/CitasServices';
	import { obtenerCitasPaciente } from '../services/CitasServices';
	import { obtenerCitasId } from '../services/CitasServices';
	import { modificarCitas } from '../services/CitasServices';
	//import { Visitas } from '../interfaces/Visitas';
import { Citas } from '../interfaces/Citas';

	export default {
		name: "App",
		components: {
			CalendarView,
			CalendarViewHeader,
		},
		data() {
			return {
				cadenaBusqueda: "",
				tipoBusqueda: "Pr",
				citasAgregadas: [],
				//Para buscar por protocolos
				protocolos: [],
				protocolosE: [],
				//
				//Para buscar por pacientes
				pacientes: [],
				pacientesE: [],
				//
				//Para la barra de busqueda
				nombre: '',
                state:'',
                states: [],
                filteredStates: [],
				//
				/* Show the current month, and give it some fake items to show */
				showDate: this.thisMonth(1),
				message: "",
				startingDayOfWeek: 0,
				disablePast: false,
				disableFuture: false,
				displayPeriodUom: "month",
				displayPeriodCount: 1,
				displayWeekNumbers: false,
				showTimes: true,
				selectionStart: null,
				selectionEnd: null,
				newItemTitle: "",
				newItemStartDate: "",
				newItemEndDate: "",
				useDefaultTheme: true,
				useHolidayTheme: true,
				useTodayIcons: false,
				items: [
					{
						id: "e0",
						startDate: "2018-01-05",
					},
					/*{
						id: "e2",//Sera el mismo que el de la base
						startDate: this.thisMonth(10),//Aqui seleccionamos el dia (partiendo la fecha de cada cita)
						title: "Evento de referencia",//Aqui Nombre paciente + Protocolo
					},
					{
						id: "61d0bd0b4e6540fb07193b86",
						startDate: this.thisMonth(16),//Aqui seleccionamos el dia
						title: "Evento de color",
						classes: "orange"
					},*/
					
				],
			}
		},
		computed: {
			userLocale() {
				return CalendarMath.getDefaultBrowserLocale
			},
			dayNames() {
				return CalendarMath.getFormattedWeekdayNames(this.userLocale, "long", 0)
			},
			themeClasses() {
				return {
					"theme-default": this.useDefaultTheme,
					"holiday-us-traditional": this.useHolidayTheme,
					"holiday-us-official": this.useHolidayTheme,
				}
			},
			myDateClasses() {
				// This was added to demonstrate the dateClasses prop. Note in particular that the
				// keys of the object are `yyyy-mm-dd` ISO date strings (not dates), and the values
				// for those keys are strings or string arrays. Keep in mind that your CSS to style these
				// may need to be fairly specific to make it override your theme's styles. See the
				// CSS at the bottom of this component to see how these are styled.
				const o = {}
				const theFirst = this.thisMonth(1)
				const ides = [2, 4, 6, 9].includes(theFirst.getMonth()) ? 15 : 13
				const idesDate = this.thisMonth(ides)
				o[CalendarMath.isoYearMonthDay(idesDate)] = "ides"
				o[CalendarMath.isoYearMonthDay(this.thisMonth(21))] = ["do-you-remember", "the-21st"]
				return o
			},
		},
		mounted() {
			this.cargarDatos();
			//Aqui llamamos al metodo para generar items
			this.newItemStartDate = CalendarMath.isoYearMonthDay(CalendarMath.today())
			this.newItemEndDate = CalendarMath.isoYearMonthDay(CalendarMath.today())
		},
		methods: {
			async cargarDatos() {
				this.states.length = 0;
				this.filteredStates.length = 0;
				this.items.length = 1;
				this.citasAgregadas.length = 0;
				if(this.tipoBusqueda == "Pr"){
					const res = await consultarProtocolosRex('a');
					this.protocolos = res.data;
					this.protocolos.forEach(element => {
						this.states.push(element);
					});
				} else if(this.tipoBusqueda == "Pa") {
					const res = await consultarPacientesRex('a');
					this.pacientes = res.data;
					this.pacientes.forEach(element => {
						this.states.push(element);
					});
				}
			},
			filterStates(){
                if(this.nombre.length === 0){
                    this.filteredStates = []
                }else{
                    this.filteredStates = this.states.filter(state => {
                        return state.toLowerCase().includes(this.nombre.toLowerCase())
                    })
                }
            },
			async recon(){
				if(this.nombre.length !== 0){
					this.states.length = 0;
					this.filteredStates.length = 0;
					if(this.tipoBusqueda == "Pr"){
						const res = await consultarProtocolosRex(this.nombre);
						this.protocolos = res.data;
						this.protocolos.forEach(element => {
							if(!this.states.includes(element)){
								this.states.push(element);
							}
						});
					} else if(this.tipoBusqueda == "Pa") {
						const res = await consultarPacientesRex(this.nombre);
						this.pacientes = res.data;
						this.pacientes.forEach(element => {
							if(!this.states.includes(element)){
								this.states.push(element);
							}
						});
					}
					this.filterStates()
				}
			},
			async buscaData(nom){
				if(this.tipoBusqueda == "Pr"){
					const res = await consultarProtocoloNom(nom);
					this.protocolo = res.data;
					let Visitas = await obtenerCitasProtocolo(this.protocolo._id);
					let citas = Visitas.data;
					for(let index = 0; index < citas.length; index++){
						let paci = await consultarPaciente(citas[index].idPaciente);
						paci = paci.data;
						for(let index2 = 0; index2 < citas[index].visitas.length; index2++){
							//console.log(citas[index]._id);
							let id = citas[index].visitas[index2]._id; 
							let startDate = citas[index].visitas[index2].citaFecha;
							let title = paci.nomPila + " " +paci.primApellido+ " " +paci.segApellido+ " " + this.protocolo.nomProtocolo +" "+ this.protocolo.visitas[index].nomeclatura+(index2+1);
							if(!this.citasAgregadas.includes(id)){
								this.items.push({
								id: id,
								startDate: startDate,
								title: title,
								url: citas[index]._id,
							});
							this.citasAgregadas.push(id);
							}
						}
					}
				}else if(this.tipoBusqueda == "Pa"){
					let nombre = nom.split("-");
					const res = await consultarPacienteNom(nombre[0], nombre[1], nombre[2]);
					this.paciente = res.data;
					let Visitas = await obtenerCitasPaciente(this.paciente._id);
					let citas = Visitas.data;
					let proto = await consultarProtocolo(citas.idProtocolo);
					proto = proto.data;
					for(let index = 0; index < citas.visitas.length; index++){
						//console.log(citas._id);
						let id = citas.visitas[index]._id;
						let startDate = citas.visitas[index].citaFecha;
						let title = nom + " " + proto.nomProtocolo + " " + proto.visitas[index].nomeclatura+(index+1);
						if(!this.citasAgregadas.includes(id)){
							this.items.push({
							id: id,
							startDate: startDate,
							title: title,
							url: citas._id,
						});
						this.citasAgregadas.push(id);
						}
					}
				}
				this.nombre = "";
				this.filterStates();
			},
			periodChanged(){
				// range, eventSource) {
				// Demo does nothing with this information, just including the method to demonstrate how
				// you can listen for changes to the displayed range and react to them (by loading items, etc.)
				//console.log(eventSource)
				//console.log(range)
			},
			thisMonth(d, h, m) {
				const t = new Date()
				/*console.log("AQUI ESTAS LO QUE BUSCAS")
				console.log(t.getFullYear())
				console.log(t.getMonth())
				console.log(d)
				console.log(h)
				console.log(0, m)
				console.log(0)
				console.log("AQUI ESTAS LO QUE BUSCAS")*/
				return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
				
			},
			onClickDay(d) {
				this.selectionStart = null
				this.selectionEnd = null
				this.message = `Dia seleccionado: ${d.toLocaleDateString()}`
			},
			onClickItem(e) {
				this.message = `Evento seleccionado: ${e.title}`
			},
			setShowDate(d) {
				this.message = `Haz cambiado la vista a ${d.toLocaleDateString()}`
				this.showDate = d
			},
			setSelection(dateRange) {
				this.selectionEnd = dateRange[1]
				this.selectionStart = dateRange[0]
			},
			finishSelection(dateRange) {
				this.setSelection(dateRange)
				this.message = `Haz seleccionado: ${this.selectionStart.toLocaleDateString()} -${this.selectionEnd.toLocaleDateString()}`
			},
			async onDrop(item, date) { //Aqui se cambia el dia de la cita
				this.message = `Se ha cambiado ${item.id} a ${date.toLocaleDateString()}`

				let Citas = await obtenerCitasId(item.url);
				Citas = Citas.data; //La que se modificara
				
				if(this.validarOrden(Citas, item.id, date)){
					let index;
					for(let i=0; i<Citas.visitas.length; i++){
						if(Citas.visitas[i]._id == item.id){
							index = i;
							break;
						}
					}
					console.log(index);
					let protocolo = await consultarProtocolo(Citas.idProtocolo);
					protocolo = protocolo.data;
					let citasBD = await obtenerCitasId(item.url);
					citasBD = citasBD.data; //La que se modificara
					let bool = true;
					if(this.validarVentana(Citas, protocolo, citasBD, index)){
						console.log("Se puede cambiar la ventana")
						const eLength = CalendarMath.dayDiff(item.startDate, date)
						item.originalItem.startDate = CalendarMath.addDays(item.startDate, eLength)
						item.originalItem.endDate = CalendarMath.addDays(item.endDate, eLength)
						modificarCitas(Citas._id, Citas);
					}else{
						alert("No se puede cambiar la ventana")
						bool = false;
					}
				}else{
					alert("No se puede cambiar el dia")
				}
				// Determine the delta between the old start date and the date chosen,
				// and apply that delta to both the start and end date to move the item.
				//Pasar esto a donde se hara la modificacion
				
			},
			validarOrden(Citas, idCita, date){
				for(let index = 0; index < Citas.visitas.length; index++){
					if(Citas.visitas[index]._id == idCita){
						Citas.visitas[index].citaFecha = date.toISOString().substring(0, 10);
						break;
					}
				}
				let length = Citas.visitas.length;
				let cont = 0;
				for(let i = 0; i < length; i++){
					for(let j = 0; j < (length - i - 1); j++){
						if( cont != length-1 ){
							let fecha1 = new Date(Citas.visitas[j].citaFecha);
							let fecha2 = new Date(Citas.visitas[j+1].citaFecha);
							//console.log(`${j}: `+ fecha1.toISOString().substring(0, 10) + `: ${j+1}: `+ fecha2.toISOString().substring(0, 10))
							if(fecha1 > fecha2){
								return false;
							}
							cont++;
						}
					}
				}
				return true;
			},
			validarVentana(citas, protocolo, citasBD, i){
				if(protocolo.visitas[i].ventana == 'Ninguno'){
					let fechaN = new Date(citas.visitas[i].citaFecha);
					let fechaO = new Date(citasBD.visitas[i].citaFecha);
					console.log(`${i}: `+ fechaN.toISOString().substring(0, 10) + `: ${i}: `+ fechaO.toISOString().substring(0, 10))
					console.log(fechaN == fechaO)
					if(fechaN == fechaO){
						return true
					}else{
						return false
					}
				}
				let dia = 1000 * 60 * 60 * 24;
				let fechaA = new Date(citasBD.visitas[i].citaFecha);
				let fechaN = new Date(citas.visitas[i].citaFecha);
				if(protocolo.visitas[i].ventana == '+'){
					let fechaL = new Date(fechaA.getTime() + (dia * protocolo.visitas[i].dias));
					if(fechaN >= fechaA && fechaN <= fechaL){
						return true
					}else{
						return false
					}
				}
				if(protocolo.visitas[i].ventana == '-'){
					let fechaL = new Date(fechaA.getTime() - (dia * protocolo.visitas[i].dias));
					if(fechaN <= fechaA && fechaN >= fechaL){
						return true
					}else{
						return false
					}
				}
				if(protocolo.visitas[i].ventana == '+/-'){
					let fechaL = new Date(fechaA.getTime() + (dia * protocolo.visitas[i].dias));
					let fechaR = new Date(fechaA.getTime() - (dia * protocolo.visitas[i].dias));
					if(fechaN >= fechaR && fechaN <= fechaL){
						return true
					}else{
						return false
					}
				}
			},
			clickTestAddItem() {
				this.items.push({
					startDate: this.newItemStartDate,
					endDate: this.newItemEndDate,
					title: this.newItemTitle,
					id: "e" + Math.random().toString(36).substr(2, 10),
				})
				this.message = "Evento agregado con exito!!!"
			},
		},
	}
</script>

<style scoped>
#app {
	display: flex;
	flex-direction: row;
	font-family: Calibri, sans-serif;
	width: 95vw;
	min-width: 30rem;
	max-width: 100rem;
	min-height: 40rem;
	margin-left: auto;
	margin-right: auto;
}
.calendar-controls {
	margin-right: 1rem;
	min-width: 14rem;
	max-width: 14rem;
}
.calendar-parent {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-x: hidden;
	overflow-y: hidden;
	max-height: 80vh;
	background-color: white;
}
/* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
.cv-wrapper.period-month.periodCount-2 .cv-week,
.cv-wrapper.period-month.periodCount-3 .cv-week,
.cv-wrapper.period-year .cv-week {
	min-height: 6rem;
}
/* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. */
/* Add some styling for items tagged with the "birthday" class */
.theme-default .cv-item.birthday {
	background-color: #e0f0e0;
	border-color: #d7e7d7;
}
.theme-default .cv-item.birthday::before {
	content: "\1F382"; /* Birthday cake */
	margin-right: 0.5em;
}
/* The following classes style the classes computed in myDateClasses and passed to the component's dateClasses prop. */
.theme-default .cv-day.ides {
	background-color: #ffe0e0;
}
.ides .cv-day-number::before {
	content: "\271D";
}
.cv-day.do-you-remember.the-21st .cv-day-number::after {
	content: "\1F30D\1F32C\1F525";
}
</style>