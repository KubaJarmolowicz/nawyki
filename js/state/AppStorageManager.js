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
}

const storageManager = new AppStorageManager();

export { storageManager };
