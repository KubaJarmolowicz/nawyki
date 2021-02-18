import { Day } from "./Day.js";
import { makeActive, makeInactive } from "./helpers.js";

const options = { month: "long" };
const lang = navigator.language;

export class MonthManager {
	constructor(state, monthIndex, currentYear) {
		this._currentYear = currentYear;
		this._monthIndex = monthIndex;
		this.name = this.getMonthName(currentYear, monthIndex, lang);
		this.numberOfDays = this.getNumberOfDaysInMonth(currentYear, monthIndex);
		this.allDays = this.getAllDays(this.numberOfDays);
		this.daysWithChangedStatus = this.getDaysWithChangedStatus(state);

		this._DOMRefference = document.querySelector(
			`.habit__month--${
				monthIndex < 9 ? "0" + (monthIndex + 1) : monthIndex + 1
			}`
		);

		this._DOMMonthName = this._DOMRefference.querySelector(".habit__monthName");
		this._DOMDaysList = this._DOMRefference.querySelector(".habit__days-list");

		this._DOMRefference.addEventListener("changeactivestate", event => {
			event.stopPropagation();
			this._DOMRefference.dispatchEvent(
				new CustomEvent("habitstatechange", {
					bubbles: true,
					detail: {
						monthIndex: this._monthIndex,
						dayNumber: event.detail.number,
						isActive: event.detail.isActive,
					},
				})
			);
		});
	}
	initDaysList() {
		const fullList = document.createDocumentFragment();

		const previouslyModifiedDays = Object.keys(this.daysWithChangedStatus);

		this.allDays.forEach((day, index) => {
			day.init();

			day.attachClickHandler();

			if (previouslyModifiedDays.includes((index + 1).toString())) {
				const dayStatus = this.daysWithChangedStatus[`${index + 1}`];

				dayStatus
					? makeActive(day.DOMRefference)
					: makeInactive(day.DOMRefference);
			}

			fullList.appendChild(day.DOMRefference);
		});

		return fullList;
	}

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

	getDaysWithChangedStatus({ currentMonths }) {
		const daysWithChangedStatus =
			currentMonths[this._monthIndex].habitStatusOnDay;

		return Object.keys(daysWithChangedStatus).length !== 0
			? daysWithChangedStatus
			: {};
	}
}
