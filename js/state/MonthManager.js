import { Day } from "./Day.js";

const options = { month: "long" };
const lang = navigator.language;

export class MonthManager {
	constructor(date, monthIndex, currentYear) {
		this._currentYear = currentYear;
		this._monthIndex = monthIndex;
		this.name = this.getMonthName(currentYear, monthIndex, lang);
		this.numberOfDays = this.getNumberOfDaysInMonth(currentYear, monthIndex);
		this.allDays = this.getAllDays(this.numberOfDays);

		this._DOMRefference = document.querySelector(
			`.habit__month--${
				monthIndex < 9 ? "0" + (monthIndex + 1) : monthIndex + 1
			}`
		);

		this._DOMMonthName = this._DOMRefference.querySelector(".habit__monthName");
		this._DOMDaysList = this._DOMRefference.querySelector(".habit__days-list");
	}
	initDaysList() {
		const fullList = document.createDocumentFragment();
		this.allDays.forEach(day => {
			const renderableDay = day.init();
			fullList.appendChild(renderableDay);
		});

		return fullList;
	}

	getMonthNameRefference(monthIndex) {}

	getMonthName(year, monthIndex, language) {
		return new Intl.DateTimeFormat(language, options).format(
			new Date(year, monthIndex)
		);
	}

	getNumberOfDaysInMonth(year, monthIndex) {
		return new Date(year, monthIndex + 1, 0).getDate();
	}

	getAllDays(numberOfDays) {
		let allDays = [];
		for (let i = 1; i <= numberOfDays; i++) {
			allDays.push(new Day(this._currentYear, this._monthIndex, i));
		}
		return allDays;
	}

	getAllDaysNames() {
		return this.allDays.map(day => day.name);
	}
}

/*

MonthManagery sa tworzone tylko przez YearManagera i tylko trakuja co zostalo klikniete,
ile klikow w miesiacu i moga sterowac kolorkiem tych kolek, wysylajac info o tym do Yearmanagera.

Moze przyjmowac month od yearmanagera w constructorze i potem dzielic na dni itd.?

Tutaj metody ilosci dni, rozkladu dni w miesiacach itd.

Ilosc dni lepiej na Yearmanagerze czy tutaj..?

*/
