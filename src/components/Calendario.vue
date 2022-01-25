<template>
	<div id="app">
		<h1>Calendario de prueba</h1>

		<calendar-view
			:show-date="showDate"
			class="theme-default holiday-us-traditional holiday-us-official">
			<template #header="{ headerProps }">
				<calendar-view-header :header-props="headerProps" @input="setShowDate" />
			</template>
		</calendar-view>

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
                    <label class="label">Themes</label>
                    <label class="checkbox">
                        <input v-model="useDefaultTheme" type="checkbox" />
                        Default
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

		<div class="calendar-parent"> <!-- aqui comienza el codigo del calendario -->
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
                    <calendar-view-header  :header-props="headerProps" @input="setShowDate" />
                </template>
            </calendar-view>
        </div>
	</div>
</template>
<script>
    import { CalendarView, CalendarViewHeader, CalendarMath } from "vue-simple-calendar"

    import "vue-simple-calendar/dist/style.css"
    // The next two lines are optional themes
    //import "vue-simple-calendar/static/css/default.css"
    import "vue-simple-calendar/static/css/holidays-us.css"

    export default {
        name: 'app',
		components: {
            CalendarView,
            CalendarViewHeader,
        },
        data() {
            return { showDate: this.thisMonth(1), 
				message: "",
				startingDateOfWeek: 0,
				disablePast: false,
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
			}
        },
		computed:{
			userlocale(){
				return CalendarMath.getDefaultBrowserLocale
			},
			dayNames(){
				return CalendarMath.getFormattedWeekdayNames(this.userlocale, "long", 0) 
			},
			themeClasses(){
				return{
					"theme-default": this.useDefaultTheme,
					"holiday-us-traditional": this.useHolidayTheme,
					"holiday-us-official": this.useHolidayTheme,
				}
			},
			/*myDateClasses(){
				const o = {} 
				const thefirst = new Date()
				const ides = [2, 4, 6, 9].includes(thefirst.getMonth()) ? 15 : 13
				const idesDate = new Date(ides)
				o[CalendarMath.isoYearMonthDay(idesDate)] = "ides"
				o[CalendarMath.isoYearMonthDay(this.Month(21))] = ["Do you remember?"]
			}*/
		},
		mounted() {
			this.newItemStartDate = CalendarMath.isoYearMonthDay(CalendarMath.today())
			this.newItemEndDate = CalendarMath.isoYearMonthDay(CalendarMath.today())
		},
        methods: {
            thisMonth(d, h, m) {
            const t = new Date()
            return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
			},
			onClickDay(d) {
				this.selectionStart = null
				this.selectionEnd = null
				this.message = 'You clicked: ${d.toLocaleDateString()}'
			},
			onClickItem(e) {
				this.message = 'You clicked: ${e.title}'
			},
			setShowDate(d) {
				this.message = 'Changing calendar view to ${d.toLocaleDateString()}'
				this.showDate = d
			},
			setSelection(dateRange) {
				this.selectionEnd = dateRange[1]
				this.selectionStart = dateRange[0]
			},
			finishSelection(dateRange) {
				this.setSelection(dateRange)
				this.message = 'You selected: ${this.selectionStart.toLocaleDateString()} -${this.selectionEnd.toLocaleDateString()}'
			},
			onDrop(item, date) {
				this.message = 'You dropped ${item.id} on ${date.toLocaleDateString()}'
				// Determine the delta between the old start date and the date chosen,
				// and apply that delta to both the start and end date to move the item.
				const eLength = CalendarMath.dayDiff(item.startDate, date)
				item.originalItem.startDate = CalendarMath.addDays(item.startDate, eLength)
				item.originalItem.endDate = CalendarMath.addDays(item.endDate, eLength)
        	},
       	 	clickTestAddItem() {
				this.items.push({
					startDate: this.newItemStartDate,
					endDate: this.newItemEndDate,
					title: this.newItemTitle,
					id: "e" + Math.random().toString(36).substr(2, 10),
				})
				this.message = "You added a calendar item!"
        	}
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