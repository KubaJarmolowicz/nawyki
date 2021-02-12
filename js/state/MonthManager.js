import { Day } from "./Day.js";

const dayNames = [
	"Niedziela",
	"Poniedziałek",
	"Wtorek",
	"Środa",
	"Czwartek",
	"Piątek",
	"Sobota",
];

const options = { month: "long" };
const lang = navigator.language;

export class MonthManager {
	constructor(date, monthIndex, currentYear) {
		this._currentYear = currentYear;
		this._monthIndex = monthIndex;
		this.name = this.getMonthName(currentYear, monthIndex, lang);
		this.numberOfDays = this.getNumberOfDaysInMonth(currentYear, monthIndex);
		this.allDays = [];
		this.experimantalDays = [
			new Day(currentYear, monthIndex, 1),
			new Day(currentYear, monthIndex, 2),
			new Day(currentYear, monthIndex, 3),
		];
	}

	getMonthName(year, monthIndex, language) {
		return new Intl.DateTimeFormat(language, options).format(
			new Date(year, monthIndex)
		);
	}

	getNumberOfDaysInMonth(year, monthIndex) {
		return new Date(year, monthIndex + 1, 0).getDate();
	}

	getDayName(dayNumber) {
		const dayNumberInWeek = new Date(
			this._currentYear,
			this._monthIndex,
			dayNumber
		).getDay();
		return dayNames[dayNumberInWeek];
	}

	getExperimentalDaysNames() {
		return this.experimantalDays.map(day => day.name);
	}
}

/*

MonthManagery sa tworzone tylko przez YearManagera i tylko trakuja co zostalo klikniete,
ile klikow w miesiacu i moga sterowac kolorkiem tych kolek, wysylajac info o tym do Yearmanagera.

Moze przyjmowac month od yearmanagera w constructorze i potem dzielic na dni itd.?

Tutaj metody ilosci dni, rozkladu dni w miesiacach itd.

Ilosc dni lepiej na Yearmanagerze czy tutaj..?

*/
