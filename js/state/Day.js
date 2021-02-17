import { isActive, makeActive, makeInactive } from "./helpers.js";

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

		this.DOMRefference = day;

		return day;
	}

	attachClickHandler(DOMRefference) {
		this.DOMRefference.querySelector("button").addEventListener(
			"click",
			event => {
				if (!isActive(this.DOMRefference)) {
					makeActive(this.DOMRefference);
				} else {
					makeInactive(this.DOMRefference);
				}

				this.DOMRefference.dispatchEvent(
					new CustomEvent("changeactivestate", {
						bubbles: true,
						detail: {
							name: this.DOMRefference.getAttribute("data-name"),
							number: this.DOMRefference.getAttribute("data-number"),
							isActive: isActive(this.DOMRefference),
						},
					})
				);
			}
		);
	}
}
