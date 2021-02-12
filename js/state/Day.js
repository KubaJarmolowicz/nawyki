const options = { weekday: "long" };
const lang = navigator.language;

export class Day {
	constructor(currentYear, monthIndex, dayNumber) {
		this.currentYear = currentYear;
		this.monthIndex = monthIndex;
		this.number = dayNumber;
		this.name = this.getDayName(currentYear, monthIndex, dayNumber, lang);
	}
	init() {}

	getDayName(year, monthIndex, dayNumber, language) {
		return new Intl.DateTimeFormat(language, options).format(
			new Date(year, monthIndex, dayNumber)
		);
	}
}

/*

Klasa tworzaca li z kazdym dniem w roku, gdzie bd numer dnia, nazwa dnia tygodnia i
to koleczko do klikniecia

*/
