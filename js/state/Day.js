const options = { weekday: "long" };
const lang = navigator.language;

export class Day {
	constructor(currentYear, monthIndex, dayNumber) {
		this.currentYear = currentYear;
		this.monthIndex = monthIndex;
		this.number = dayNumber;
		this.name = this.getDayName(currentYear, monthIndex, dayNumber, lang);
	}

	getDayName(year, monthIndex, dayNumber, language) {
		return new Intl.DateTimeFormat(language, options).format(
			new Date(year, monthIndex, dayNumber)
		);
	}

	init() {
		const day = document.createElement("li");
		day.setAttribute("data-name", this.name);
		day.setAttribute("data-number", this.number);
		day.classList.add("habit__day");

		day.innerHTML = `<p class="habit__dayNumName">${this.number} <span>${this.name}</span></p><button class="habit__checkBox"></button>`;

		return day;
	}

	attachClickHandler(DOMRefference) {
		DOMRefference.querySelector("button").addEventListener("click", event => {
			event.target.dispatchEvent(
				new CustomEvent("changeActivation", {
					bubbles: true,
					detail: {
						name: event.target.parentElement.getAttribute("data-name"),
						number: event.target.parentElement.getAttribute("data-number"),
					},
				})
			);
		});
	}
}
