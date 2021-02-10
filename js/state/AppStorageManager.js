class AppStorageManager {
	constructor() {
		this.storage = localStorage;
	}

	saveState(value) {
		this.storage.setItem("savedState", JSON.stringify(value));
	}

	getCurrentState() {
		const requestedData = this.storage.getItem("savedState");
		return requestedData ? JSON.parse(requestedData) : null;
	}

	resetState() {
		this.storage.removeItem("savedState");
	}

	savePastYear(value) {
		this.storage.setItem("pastYears", JSON.stringify(value));
	}

	getPastYears() {
		const pastYears = this.storage.getItem("pastYears");
		return pastYears ? JSON.parse(pastYears) : null;
	}

	resetPastYears() {
		this.storage.removeItem("pastYears");
	}
}

const storageManager = new AppStorageManager();

export { storageManager };
