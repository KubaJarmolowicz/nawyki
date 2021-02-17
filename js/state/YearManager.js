import { MonthManager } from "./MonthManager.js";

export class YearManager {
	constructor(date) {
		this._date = date;
		this.currentYear = date.getFullYear();
		this.months = [
			new MonthManager(date, 0, this.currentYear),
			new MonthManager(date, 1, this.currentYear),
			new MonthManager(date, 2, this.currentYear),
			new MonthManager(date, 3, this.currentYear),
			new MonthManager(date, 4, this.currentYear),
			new MonthManager(date, 5, this.currentYear),
			new MonthManager(date, 6, this.currentYear),
			new MonthManager(date, 7, this.currentYear),
			new MonthManager(date, 8, this.currentYear),
			new MonthManager(date, 9, this.currentYear),
			new MonthManager(date, 10, this.currentYear),
			new MonthManager(date, 11, this.currentYear),
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
