const options = { weekday: "long" };
const lang = navigator.language;

export class Day {
	constructor(currentYear, monthIndex, dayNumber) {
		this.currentYear = currentYear;
		this.monthIndex = monthIndex;
		this.number = dayNumber;
		this.name = this.getDayName(currentYear, monthIndex, dayNumber, lang);
	}
	init() {
		const day = document.createElement("li");
		day.classList.add("habit__day");

		day.innerHTML = `<p class="habit__dayNumName">${this.number} <span>${this.name}</span></p><button class="habit__checkBox"></button>`;

		return day;
	}

	getDayName(year, monthIndex, dayNumber, language) {
		return new Intl.DateTimeFormat(language, options).format(
			new Date(year, monthIndex, dayNumber)
		);
	}
}
