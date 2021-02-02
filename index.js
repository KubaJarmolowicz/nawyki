"use strict";

const monthList = document.querySelector(".habit__months-list");
const allMonths = Array.from(document.querySelectorAll(".habit__month"));
const prevBtn = document.querySelector(".habit__button--prev");
const nextBtn = document.querySelector(".habit__button--next");

const monthListStartingPosition = getMonthlistXPosition();

prevBtn.addEventListener("click", displayPreviousMonths);

nextBtn.addEventListener("click", displayFollowingMonths);

function displayFollowingMonths() {
	if (isTransitionPlaying()) return;

	disableSideScroll();

	const monthListCurrentPosition =
		monthListStartingPosition - getMonthlistXPosition();

	const monthListWidth = getMonthlistWidth();

	const requestedTranslateX = monthListCurrentPosition + monthListWidth;

	if (wouldScrollPastEnd(requestedTranslateX)) {
		scrollToEnd();
	} else {
		sideScrollTo(requestedTranslateX);
	}

	monthList.addEventListener("transitionend", enableSideScroll);
}

function displayPreviousMonths() {
	if (isTransitionPlaying()) return;

	disableSideScroll();

	const monthListCurrentPosition = getMonthlistXPosition();

	const monthListWidth = getMonthlistWidth();

	const requestedTranslateXValue =
		monthListCurrentPosition + monthListWidth - monthListStartingPosition;

	if (wouldScrollPastStart(requestedTranslateXValue)) {
		scrollToStart();
	} else {
		sideScrollTo(requestedTranslateXValue);
	}

	monthList.addEventListener("transitionend", enableSideScroll);
}

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

function disableSideScroll() {
	monthList.classList.add("isAnimating");
}

function enableSideScroll() {
	monthList.classList.remove("isAnimating");
}

function isTransitionPlaying() {
	return monthList.classList.contains("isAnimating");
}

function showBtn(btn) {
	btn.style.display = "block";
}

function hideBtn(btn) {
	btn.style.display = "none";
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
	return calculatedTranslateXVal > monthListStartingPosition;
}

function wouldScrollPastEnd(calculatedTranslateXVal) {
	const normalisedTranslateXVal = -1 * Math.abs(calculatedTranslateXVal);
	const maxTranslateXVal = getMaxTranslateX();
	return normalisedTranslateXVal < maxTranslateXVal;
}

const options = {
	root: document.querySelector(".habit"),
};

const startObserver = new IntersectionObserver(adjustToStartView, options);
const endObserver = new IntersectionObserver(adjustToEndView, options);

startObserver.observe(allMonths[0]);
endObserver.observe(allMonths[11]);

window.addEventListener("resize", scrollToStart);

(function IIFE() {
	const monthToDisplay = allMonths[1];

	const startingTranslateX = calculateTranslateX(monthToDisplay);

	if (wouldScrollPastEnd(startingTranslateX)) {
		scrollToEnd();

		return;
	}

	sideScrollTo(startingTranslateX);
})();

function calculateTranslateX(monthToDisplay) {
	const currentGap = getGapWidth();

	const singleMonthWidth = getSingleMonthWidth();

	const desiredTranslateX =
		-1 *
		Math.abs(
			(singleMonthWidth + currentGap) * allMonths.indexOf(monthToDisplay)
		);

	return desiredTranslateX;
}

function sideScrollTo(translateXValue) {
	const normalisedTranslateXVal = -1 * Math.abs(translateXValue);

	allMonths.forEach(month => {
		month.style.transform = `translateX(${normalisedTranslateXVal}px)`;
	});
}
