import { storageManager } from "./AppStorageManager.js";
import { stateTemplate } from "./stateTemplate.js";
import { YearManager } from "./YearManager.js";

const appManager = {
	wasUsedBefore() {
		return storageManager.getCurrentState() !== null;
	},

	createNewState() {
		this.updateState(stateTemplate);

		const state = storageManager.getCurrentState();

		const now = new Date();

		state.lastSavedDate = now.toDateString();

		state.currentYear = now.getFullYear();

		this.updateState(state);

		const currentView = new YearManager(new Date(state.lastSavedDate));

		currentView.render();
	},

	hasValidSavedState() {
		const state = storageManager.getCurrentState();

		const currentYear = new Date().getFullYear();
		return state.currentYear === currentYear;
	},

	displayExistingState() {
		const state = storageManager.getCurrentState();

		this.updateState(state);

		const currentView = new YearManager(new Date(state.lastSavedDate));

		currentView.render();
	},

	updateState(stateObj) {
		storageManager.saveState(stateObj);
	},

	resetState() {
		storageManager.resetState();
	},

	resetAll() {
		storageManager.resetState();
		storageManager.resetPastYears();
	},

	retirePastYear() {
		const pastYear = storageManager.getCurrentState();

		const allPastYears = storageManager.getPastYears() ?? [];

		storageManager.savePastYear([...allPastYears, pastYear]);
	},

	renderCurrentState() {
		if (!this.wasUsedBefore()) {
			this.createNewState();
			return "Creating new state...";
		} else if (this.hasValidSavedState()) {
			this.displayExistingState();
			return "Retrieving existing state...";
		} else {
			this.retirePastYear();
			this.createNewState();
			return "Saving to gone years...";
		}
	},
};

export { appManager };
