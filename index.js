"use strict";

const monthList = document.querySelector(".habit__months-list");
const months = Array.from(document.querySelectorAll(".habit__month"));

const startingListPosition = months[0].getBoundingClientRect().x;

monthList.addEventListener("contextmenu", e => {
	e.preventDefault();

	const currentListPosition = months[0].getBoundingClientRect().x;

	const currentGap =
		months[1].getBoundingClientRect().x -
		(months[0].getBoundingClientRect().x +
			months[0].getBoundingClientRect().width);

	const currentViewWidth = monthList.getBoundingClientRect().width + currentGap;

	months.forEach(month => {
		month.style.transform = `translateX(${
			currentListPosition + currentViewWidth - startingListPosition
		}px)`;
	});
});

monthList.addEventListener("click", () => {
	const currentListPosition =
		startingListPosition - months[0].getBoundingClientRect().x;

	const currentGap =
		months[1].getBoundingClientRect().x -
		(months[0].getBoundingClientRect().x +
			months[0].getBoundingClientRect().width);

	const currentViewWidth = monthList.getBoundingClientRect().width + currentGap;

	months.forEach(month => {
		month.style.transform = `translateX(-${
			currentListPosition + currentViewWidth
		}px)`;
	});
});

function callback(entry) {
	console.log(entry);
}

let options = {
	root: document.querySelector(".habit"),
	threshold: 0,
};

let observer = new IntersectionObserver(callback, options);

observer.observe(months[1]);
