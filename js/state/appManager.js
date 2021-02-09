import { storageManager } from "./AppStorageManager.js";
import { stateTemplate } from "./stateTemplate.js";
import { YearManager } from "./YearManager.js";

const appManager = {
	getCurrentYear(date) {
		return date.getFullYear().toString();
	},

	wasUsedBefore() {
		return storageManager.getCurrentState() !== "";
	},

	saveNewState() {
		this.updateState(stateTemplate);

		const state = storageManager.getCurrentState();

		state.latestSavedDate = new Date();
		state.currentYear = this.getCurrentYear(state.latestSavedDate);

		const currentView = new YearManager(state.latestSavedDate);

		currentView.init();

		return state;
	},

	hasValidSavedState() {
		const currentYear = this.getCurrentYear();
		return storageManager.getCurrentState()?.currentYear === currentYear;
	},

	displayCurrentSavedState() {
		return storageManager.getCurrentState();
	},

	updateState(stateObj) {
		storageManager.saveState(stateObj);
	},

	resetState() {
		storageManager.resetState();
	},

	renderCurrentState() {
		if (!this.wasUsedBefore()) {
			this.saveNewState();
		}
	},
};

export { appManager };
