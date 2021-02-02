"use strict";

const monthList = document.querySelector(".habit__months-list");
const allMonths = Array.from(document.querySelectorAll(".habit__month"));
const prevBtn = document.querySelector(".habit__button--prev");
const nextBtn = document.querySelector(".habit__button--next");

const startingListPosition = allMonths[0].getBoundingClientRect().x;

prevBtn.addEventListener("click", () => {
	if (monthList.classList.contains("isAnimating")) return;

	monthList.classList.add("isAnimating");
	const currentListPosition = allMonths[0].getBoundingClientRect().x;

	const currentGap =
		allMonths[1].getBoundingClientRect().x -
		(allMonths[0].getBoundingClientRect().x +
			allMonths[0].getBoundingClientRect().width);

	const currentViewWidth = monthList.getBoundingClientRect().width + currentGap;

	const requestedTranslateXValue =
		currentListPosition + currentViewWidth - startingListPosition;

	scrollToRequestedPosition(requestedTranslateXValue);

	if (currentListPosition + currentViewWidth > startingListPosition) {
		scrollToRequestedPosition(0);
	}

	monthList.addEventListener("transitionend", () => {
		monthList.classList.remove("isAnimating");
	});
});

nextBtn.addEventListener("click", () => {
	if (monthList.classList.contains("isAnimating")) return;

	monthList.classList.add("isAnimating");

	const currentListPosition =
		startingListPosition - allMonths[0].getBoundingClientRect().x;

	const currentGap =
		allMonths[1].getBoundingClientRect().x -
		(allMonths[0].getBoundingClientRect().x +
			allMonths[0].getBoundingClientRect().width);

	const currentViewWidth = monthList.getBoundingClientRect().width + currentGap;

	const requestedTranslateX = currentListPosition + currentViewWidth;

	scrollToRequestedPosition(requestedTranslateX);

	monthList.addEventListener("transitionend", () => {
		monthList.classList.remove("isAnimating");
	});
});

function adjustToStartView(entries) {
	if (entries[0].isIntersecting) {
		hideBtn(prevBtn);
	} else {
		showBtn(prevBtn);
	}
}

function adjustToEndView(entries) {
	if (entries[0].isIntersecting) {
		hideBtn(nextBtn);
	} else {
		showBtn(nextBtn);
	}
}

function showBtn(btn) {
	btn.style.display = "block";
}

function hideBtn(btn) {
	btn.style.display = "none";
}

function resetTranslate() {
	allMonths.forEach(month => {
		month.style.transform = `translateX(0)`;
	});
}

const options = {
	root: document.querySelector(".habit"),
};

const startObserver = new IntersectionObserver(adjustToStartView, options);
const endObserver = new IntersectionObserver(adjustToEndView, options);

startObserver.observe(allMonths[0]);
endObserver.observe(allMonths[11]);

window.addEventListener("resize", resetTranslate);

(function IIFE() {
	const monthToDisplay = allMonths[9];

	const startingTranslateX = calculateTranslateX(monthToDisplay);

	scrollToRequestedPosition(startingTranslateX);
})();

function calculateTranslateX(monthToDisplay) {
	const currentGap =
		allMonths[1].getBoundingClientRect().x -
		(allMonths[0].getBoundingClientRect().x +
			allMonths[0].getBoundingClientRect().width);

	const singleMonthWidth = allMonths[0].getBoundingClientRect().width;

	const desiredTranslateX =
		(singleMonthWidth + currentGap) * allMonths.indexOf(monthToDisplay);

	return desiredTranslateX;
}

function scrollToRequestedPosition(translateXValue) {
	const normalisedTranslateXVal = -1 * Math.abs(translateXValue);

	const currentGap =
		allMonths[1].getBoundingClientRect().x -
		(allMonths[0].getBoundingClientRect().x +
			allMonths[0].getBoundingClientRect().width);

	const singleMonthWidth = allMonths[0].getBoundingClientRect().width;

	const currentViewWidth = monthList.getBoundingClientRect().width + currentGap;

	const monthsOnPage = Math.round(currentViewWidth / singleMonthWidth);

	const maxTranslateX = 0;

	const minTranslateX = -1 * ((12 / monthsOnPage - 1) * currentViewWidth);

	if (normalisedTranslateXVal > maxTranslateX) {
		allMonths.forEach(month => {
			month.style.transform = `translateX(${maxTranslateX})`;
		});

		return;
	}

	if (normalisedTranslateXVal < minTranslateX) {
		allMonths.forEach(month => {
			month.style.transform = `translateX(${minTranslateX}px)`;
		});

		return;
	}

	allMonths.forEach(month => {
		month.style.transform = `translateX(${normalisedTranslateXVal}px)`;
	});
}
