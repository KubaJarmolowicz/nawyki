export const stateTemplate = {
	currentYear: "",
	lastSavedDate: "",
	currentMonths: [
		{
			name: "Styczeń",
			habitStatusOnDay: {},
		},
		{
			name: "Luty",
			habitStatusOnDay: {},
		},
		{
			name: "Marzec",
			habitStatusOnDay: {},
		},
		{
			name: "Kwiecień",
			habitStatusOnDay: {},
		},
		{
			name: "Maj",
			habitStatusOnDay: {},
		},
		{
			name: "Czerwiec",
			habitStatusOnDay: {},
		},
		{
			name: "Lipiec",
			habitStatusOnDay: {},
		},
		{
			name: "Sierpień",
			habitStatusOnDay: {},
		},
		{
			name: "Wrzesień",
			habitStatusOnDay: {},
		},
		{
			name: "Październik",
			habitStatusOnDay: {},
		},
		{
			name: "Listopad",
			habitStatusOnDay: {},
		},
		{
			name: "Grudzień",
			habitStatusOnDay: {},
		},
	],
};

function showOirginalTemplate() {
	console.log("from original file:", stateTemplate.currentYear);
}

export { showOirginalTemplate };
