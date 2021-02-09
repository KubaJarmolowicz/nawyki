import { storageManager } from "./AppStorageManager.js";
import { stateTemplate } from "./stateTemplate.js";
import { YearManager } from "./YearManager.js";

const appManager = {
	getCurrentYear() {
		return new Date().getFullYear().toString();
	},

	wasUsedBefore() {
		return storageManager.getCurrentState() !== "";
	},

	saveNewState() {
		this.updateState(stateTemplate);

		const state = storageManager.getCurrentState();

		state.currentYear = this.getCurrentYear();

		const currentView = new YearManager(new Date());

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
