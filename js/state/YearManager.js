import { MonthManager } from "./MonthManager.js";

/* YearManager jako singleton do zarzadzania konkretnym rokiem, jesli rok sie zmieni
to dopiero tworzymy nowego, poki rok trwa to zapisujemy w savedState i w firebasie
czy tam gdzies -> jedyny komponent mogacy nadpisywac stan?

Poki metoda jakas w stylu isStillValid() zwraca true to return this i chuj

Na nim metoda do pobierania miesiecy + metody nadpisujace stan..?


, jak isStillValid() zwroci false to  wywolujemy je wszystkie i na nowo zapisujemy wyniki
w savedState

Mozemy zrobic 12 instancji managerow miesiaca zeby bylo latwiej okreslic czy klikniete
czy nie..

Tu chyba tez jakis listener na zaznaczenie/odznaczenie kolka zeby calosc stanu nadpisac
przy kazdej modyfikacji (mutation Observer? listener na custom event?)
*/

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
			console.log(month.name);
		});
	}

	renderDays() {
		this.months.forEach(month => {
			console.log(month.numberOfDays);
		});

		console.log(this.months[0].getDayName(1));
	}

	renderExperimentalDays() {
		this.months.forEach(month => {
			console.log(month.getExperimentalDaysNames());
		});
	}

	render() {
		this.renderMonthNames();
		this.renderDays();
		this.renderExperimentalDays();
	}
}
