import { storageManager } from "./AppStorageManager.js";
import { stateTemplate } from "./stateTemplate.js";
import { YearManager } from "./YearManager.js";

const appManager = {
	// getCurrentYear(date) {
	// 	return date.getFullYear().toString();
	// },

	wasUsedBefore() {
		return storageManager.getCurrentState() !== null;
	},

	createNewState() {
		this.updateState(stateTemplate);

		const state = storageManager.getCurrentState();

		state.currentYear = new Date().getFullYear();

		this.updateState(state);

		const currentView = new YearManager(new Date());

		currentView.init();

		return state; // --> do usuniecia potem
	},

	hasValidSavedState() {
		const state = storageManager.getCurrentState();

		const currentYear = new Date().getFullYear();
		return state.currentYear === currentYear;
	},

	displayExistingState() {
		const state = storageManager.getCurrentState();

		const currentView = new YearManager(new Date());

		currentView.init();
		return state;
	},

	updateState(stateObj) {
		storageManager.saveState(stateObj);
	},

	resetState() {
		storageManager.resetState();
	},

	renderCurrentState() {
		if (!this.wasUsedBefore()) {
			this.createNewState();
			return "Creating new state...";
		}
		if (this.hasValidSavedState()) {
			this.displayExistingState();
			return "Retrieving existing state...";
		}
	},
};

export { appManager };
