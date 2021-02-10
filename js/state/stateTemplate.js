export const stateTemplate = {
	currentYear: "",
	lastSavedDate: "",
	currentMonths: [
		{
			name: "Styczeń",
			habitContinuedDates: [],
		},
		{
			name: "Luty",
			habitContinuedDates: [],
		},
		{
			name: "Marzec",
			habitContinuedDates: [],
		},
		{
			name: "Kwiecień",
			habitContinuedDates: [],
		},
		{
			name: "Maj",
			habitContinuedDates: [],
		},
		{
			name: "Czerwiec",
			habitContinuedDates: [],
		},
		{
			name: "Lipiec",
			habitContinuedDates: [],
		},
		{
			name: "Sierpień",
			habitContinuedDates: [],
		},
		{
			name: "Wrzesień",
			habitContinuedDates: [],
		},
		{
			name: "Październik",
			habitContinuedDates: [],
		},
		{
			name: "Listopad",
			habitContinuedDates: [],
		},
		{
			name: "Grudzień",
			habitContinuedDates: [],
		},
	],
};

function showOirginalTemplate() {
	console.log("from original file:", stateTemplate.currentYear);
}

export { showOirginalTemplate };
