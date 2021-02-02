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

	allMonths.forEach(month => {
		if (currentListPosition + currentViewWidth > startingListPosition) {
			month.style.transform = `translateX(0)`;
			return;
		}
		month.style.transform = `translateX(${
			currentListPosition + currentViewWidth - startingListPosition
		}px)`;
	});

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

	const singleMonthWidth = allMonths[0].getBoundingClientRect().width;

	const monthsOnPage = Math.round(currentViewWidth / singleMonthWidth);

	const maxTranslate = (12 / monthsOnPage - 1) * currentViewWidth;

	allMonths.forEach(month => {
		if (currentListPosition + currentViewWidth > maxTranslate) {
			month.style.transform = `translateX(-${maxTranslate}px)`;
			return;
		}
		month.style.transform = `translateX(-${
			currentListPosition + currentViewWidth
		}px)`;
	});

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
	const startingMonth = allMonths[1];

	const startingTranslate = getStartingTranslate(startingMonth);

	allMonths.forEach(month => {
		month.style.transform = `translateX(-${startingTranslate}px)`;
	});
})();

function getStartingTranslate(startingMonth) {
	const currentGap =
		allMonths[1].getBoundingClientRect().x -
		(allMonths[0].getBoundingClientRect().x +
			allMonths[0].getBoundingClientRect().width);

	const currentViewWidth = monthList.getBoundingClientRect().width + currentGap;

	const singleMonthWidth = allMonths[0].getBoundingClientRect().width;

	const monthsOnPage = Math.round(currentViewWidth / singleMonthWidth);

	const maxTranslate = (12 / monthsOnPage - 1) * currentViewWidth;

	const desiredTranslate =
		(singleMonthWidth + currentGap) * allMonths.indexOf(startingMonth);

	return desiredTranslate < maxTranslate ? desiredTranslate : maxTranslate;
}
