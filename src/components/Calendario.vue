<template>
	<div id="app">
		<h1>Calendario de prueba</h1>
		<div class="calendar-controls">
			<div v-if="message" class="notification is-success">{{ message }}</div>

			<div class="box">
				<h4 class="title is-5">Play with the options!</h4>

				<div class="field">
					<label class="label">Period UOM</label>
					<div class="control">
						<div class="select">
							<select v-model="displayPeriodUom">
								<option>month</option>
								<option>week</option>
								<option>year</option>
							</select>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label">Period Count</label>
					<div class="control">
						<div class="select">
							<select v-model="displayPeriodCount">
								<option :value="1">1</option>
								<option :value="2">2</option>
								<option :value="3">3</option>
							</select>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="label">Starting day of the week</label>
					<div class="control">
						<div class="select">
							<select v-model="startingDayOfWeek">
								<option v-for="(d, index) in dayNames" :key="index" :value="index">
									{{ d }}
								</option>
							</select>
						</div>
					</div>
				</div>

				<div class="field">
					<label class="checkbox">
						<input v-model="useTodayIcons" type="checkbox" />
						Use icon for today's period
					</label>
				</div>

				<div class="field">
					<label class="checkbox">
						<input v-model="displayWeekNumbers" type="checkbox" />
						Show week number
					</label>
				</div>

				<div class="field">
					<label class="checkbox">
						<input v-model="showTimes" type="checkbox" />
						Show times
					</label>
				</div>

				<div class="field">
					<label class="label">Themes</label>
					<label class="checkbox">
						<input v-model="useDefaultTheme" type="checkbox" />
						Default
					</label>
				</div>

				<div class="field">
					<label class="checkbox">
						<input v-model="useHolidayTheme" type="checkbox" />
						Holidays
					</label>
				</div>
			</div>

			<div class="box">
				<div class="field">
					<label class="label">Title</label>
					<div class="control">
						<input v-model="newItemTitle" class="input" type="text" />
					</div>
				</div>

				<div class="field">
					<label class="label">Start date</label>
					<div class="control">
						<input v-model="newItemStartDate" class="input" type="date" />
					</div>
				</div>

				<div class="field">
					<label class="label">End date</label>
					<div class="control">
						<input v-model="newItemEndDate" class="input" type="date" />
					</div>
				</div>

				<button class="button is-info" @click="clickTestAddItem">Add Item</button>
			</div>
		</div>




		
		<calendar-view
			:items="items"
			:show-date="showDate"
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
			class="theme-default holiday-us-traditional holiday-us-official">
			<template #header="{ headerProps }">
				<calendar-view-header :header-props="headerProps" @input="setShowDate" />
			</template>
		</calendar-view>
	</div>
</template>
<script>
	import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
	
	import "vue-simple-calendar/dist/style.css"
	// The next two lines are optional themes
	//import "vue-simple-calendar/static/css/default.css"
	import "vue-simple-calendar/static/css/holidays-us.css"

	export default {
		name: 'app',
		data: function() {
			return { /* Desde aqui puedes comenzar a comentarlo para ver como se ve */ 
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
					{
						id: "e1",
						startDate: this.thisMonth(15, 18, 30),
					},
					
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
		this.newItemStartDate = CalendarMath.isoYearMonthDay(CalendarMath.today())
		this.newItemEndDate = CalendarMath.isoYearMonthDay(CalendarMath.today())
	},

	components: {
		CalendarView,
		CalendarViewHeader,
	},
	methods: {
		setShowDate(d) {
			this.showDate = d;
		},
	}
}
</script>
<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #2c3e50;
		height: 67vh;
		width: 90vw;
		margin-left: auto;
		margin-right: auto;
	}
</style>