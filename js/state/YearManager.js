import { MonthManager } from "./MonthManager.js";

export class YearManager {
	constructor(state) {
		this._date = new Date(state.lastSavedDate);

		this.currentYear = this._date.getFullYear();
		this.months = [
			new MonthManager(state, 0, this.currentYear),
			new MonthManager(state, 1, this.currentYear),
			new MonthManager(state, 2, this.currentYear),
			new MonthManager(state, 3, this.currentYear),
			new MonthManager(state, 4, this.currentYear),
			new MonthManager(state, 5, this.currentYear),
			new MonthManager(state, 6, this.currentYear),
			new MonthManager(state, 7, this.currentYear),
			new MonthManager(state, 8, this.currentYear),
			new MonthManager(state, 9, this.currentYear),
			new MonthManager(state, 10, this.currentYear),
			new MonthManager(state, 11, this.currentYear),
		];
	}

	init() {}

	renderMonthNames() {
		this.months.forEach(month => {
			month._DOMMonthName.innerText = month.name;
		});
	}

	renderAllDays() {
		this.months.forEach(month => {
			month._DOMDaysList.appendChild(month.initDaysList());
		});
	}

	render() {
		this.renderMonthNames();
		this.renderAllDays();
	}
}
