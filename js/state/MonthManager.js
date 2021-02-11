import { Day } from "./Day.js";

const monthNames = [
	"Styczeń",
	"Luty",
	"Marzec",
	"Kwiecień",
	"Maj",
	"Czerwiec",
	"Lipiec",
	"Sierpień",
	"Wrzesień",
	"Październik",
	"Listopad",
	"Grudzień",
];

export class MonthManager {
	constructor(date, monthIndex, currentYear) {
		this._currentYear = currentYear;
		this._monthIndex = monthIndex;
		this.name = monthNames[monthIndex];
		this.numberOfDays = new Date(currentYear, monthIndex + 1, 0).getDate();
	}

	getDayName(dayNumber) {
		return new Date(this._currentYear, this._monthIndex, dayNumber).getDay();
	}
}

/*

MonthManagery sa tworzone tylko przez YearManagera i tylko trakuja co zostalo klikniete,
ile klikow w miesiacu i moga sterowac kolorkiem tych kolek, wysylajac info o tym do Yearmanagera.

Moze przyjmowac month od yearmanagera w constructorze i potem dzielic na dni itd.?

Tutaj metody ilosci dni, rozkladu dni w miesiacach itd.

Ilosc dni lepiej na Yearmanagerze czy tutaj..?

*/
