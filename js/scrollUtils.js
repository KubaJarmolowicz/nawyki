import { allMonths, monthList } from "./DOMRefferences.js";

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

function getDisplayedMonths() {
	const singleMonthWidth = getSingleMonthWidth();
	const monthListWidth = getMonthlistWidth();

	return Math.round(monthListWidth / singleMonthWidth);
}

function getMaxTranslateX() {
	const monthsCurrentlyDisplayed = getDisplayedMonths();
	const monthListWidth = getMonthlistWidth();
	return -1 * ((12 / monthsCurrentlyDisplayed - 1) * monthListWidth);
}

function disableSideScroll() {
	monthList.classList.add("isAnimating");
}

function enableSideScroll() {
	monthList.classList.remove("isAnimating");
}

function isTransitionPlaying() {
	return monthList.classList.contains("isAnimating");
}

function scrollToStart() {
	allMonths.forEach(month => {
		month.style.transform = `translateX(0)`;
	});
}

function scrollToEnd() {
	const maxAllowedTranslateX = getMaxTranslateX();

	allMonths.forEach(month => {
		month.style.transform = `translateX(${maxAllowedTranslateX}px)`;
	});
}

function wouldScrollPastStart(calculatedTranslateXVal) {
	return calculatedTranslateXVal > MONTH_LIST_STARTING_POSITION;
}

function wouldScrollPastEnd(calculatedTranslateXVal) {
	const normalisedTranslateXVal = -1 * Math.abs(calculatedTranslateXVal);
	const maxTranslateXVal = getMaxTranslateX();
	return normalisedTranslateXVal < maxTranslateXVal;
}

function sideScrollTo(translateXValue) {
	const normalisedTranslateXVal = -1 * Math.abs(translateXValue);

	allMonths.forEach(month => {
		month.style.transform = `translateX(${normalisedTranslateXVal}px)`;
	});
}

function enableScrollAfterTransition() {
	monthList.addEventListener("transitionend", enableSideScroll, { once: true });
}

const MONTH_LIST_STARTING_POSITION = getMonthlistXPosition();

export {
	sideScrollTo,
	getGapWidth,
	getSingleMonthWidth,
	getMonthlistWidth,
	wouldScrollPastEnd,
	scrollToStart,
	isTransitionPlaying,
	wouldScrollPastStart,
	scrollToEnd,
	disableSideScroll,
	enableSideScroll,
	getMonthlistXPosition,
	enableScrollAfterTransition,
	MONTH_LIST_STARTING_POSITION,
};
