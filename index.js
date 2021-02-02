"use strict";

const monthList = document.querySelector(".habit__months-list");
const allMonths = Array.from(document.querySelectorAll(".habit__month"));
const prevBtn = document.querySelector(".habit__button--prev");
const nextBtn = document.querySelector(".habit__button--next");

const monthListStartingPosition = getMonthlistXPosition();

prevBtn.addEventListener("click", () => {
	if (monthList.classList.contains("isAnimating")) return;

	monthList.classList.add("isAnimating");

	const monthListCurrentPosition = getMonthlistXPosition();

	const monthListWidth = getMonthlistWidth();

	const requestedTranslateXValue =
		monthListCurrentPosition + monthListWidth - monthListStartingPosition;

	sideScrollTo(requestedTranslateXValue);

	if (
		wouldScrollPastStart(
			monthListCurrentPosition + monthListWidth,
			monthListStartingPosition
		)
	) {
		resetTranslate();
	}

	monthList.addEventListener("transitionend", () => {
		monthList.classList.remove("isAnimating");
	});
});

nextBtn.addEventListener("click", () => {
	if (monthList.classList.contains("isAnimating")) return;

	monthList.classList.add("isAnimating");

	const monthListCurrentPosition =
		monthListStartingPosition - getMonthlistXPosition();

	const monthListWidth = getMonthlistWidth();

	const requestedTranslateX = monthListCurrentPosition + monthListWidth;

	sideScrollTo(requestedTranslateX);

	monthList.addEventListener("transitionend", () => {
		monthList.classList.remove("isAnimating");
	});
});

function getGapWidth() {
	return (
		allMonths[1].getBoundingClientRect().x -
		(allMonths[0].getBoundingClientRect().x +
			allMonths[0].getBoundingClientRect().width)
	);
}

function getMonthlistWidth() {
	return monthList.getBoundingClientRect().width + getGapWidth();
}

function getSingleMonthWidth() {
	return allMonths[0].getBoundingClientRect().width;
}

function getMonthlistXPosition() {
	return allMonths[0].getBoundingClientRect().x;
}

function getDisplayedMonths(singleMonthWidth, monthListWidth) {
	return Math.round(monthListWidth / singleMonthWidth);
}

function getMaxTranslateX(monthsCurrentlyDisplayed, monthListWidth) {
	return -1 * ((12 / monthsCurrentlyDisplayed - 1) * monthListWidth);
}

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

function wouldScrollPastStart(calculatedTranslateXVal, maxTranslateXVal) {
	return calculatedTranslateXVal > maxTranslateXVal;
}

function wouldScrollPastEnd(calculatedTranslateXVal, maxTranslateXVal) {
	return calculatedTranslateXVal < maxTranslateXVal;
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
	const monthToDisplay = allMonths[1];

	const startingTranslateX = calculateTranslateX(monthToDisplay);

	sideScrollTo(startingTranslateX);
})();

function calculateTranslateX(monthToDisplay) {
	const currentGap = getGapWidth();

	const singleMonthWidth = getSingleMonthWidth();

	const desiredTranslateX =
		(singleMonthWidth + currentGap) * allMonths.indexOf(monthToDisplay);

	return desiredTranslateX;
}

function sideScrollTo(translateXValue) {
	const normalisedTranslateXVal = -1 * Math.abs(translateXValue);

	const singleMonthWidth = getSingleMonthWidth();

	const monthListWidth = getMonthlistWidth();

	const monthsCurrentlyDisplayed = getDisplayedMonths(
		singleMonthWidth,
		monthListWidth
	);

	const maxAllowedTranslateX = getMaxTranslateX(
		monthsCurrentlyDisplayed,
		monthListWidth
	);

	if (wouldScrollPastEnd(normalisedTranslateXVal, maxAllowedTranslateX)) {
		allMonths.forEach(month => {
			month.style.transform = `translateX(${maxAllowedTranslateX}px)`;
		});

		return;
	}

	allMonths.forEach(month => {
		month.style.transform = `translateX(${normalisedTranslateXVal}px)`;
	});
}
