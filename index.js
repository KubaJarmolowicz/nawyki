"use strict";

const monthList = document.querySelector(".habit__months-list");
const months = Array.from(document.querySelectorAll(".habit__month"));

const startingListPosition = months[0].getBoundingClientRect().x;

monthList.addEventListener("click", () => {
	const currentListPosition =
		startingListPosition - months[0].getBoundingClientRect().x;

	const currentViewWidth = document
		.querySelector(".habit__header")
		.getBoundingClientRect().width;

	const currentGap =
		months[1].getBoundingClientRect().x -
		(months[0].getBoundingClientRect().x +
			months[0].getBoundingClientRect().width);

	console.log(currentGap);

	months.forEach(month => {
		month.style.transform = `translateX(-${
			currentListPosition + currentViewWidth - currentGap
		}px)`;
	});
});
