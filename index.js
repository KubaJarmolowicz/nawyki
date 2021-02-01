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

	allMonths.forEach(month => {
		month.style.transform = `translateX(-${
			currentListPosition + currentViewWidth
		}px)`;
	});

	monthList.addEventListener("transitionend", () => {
		monthList.classList.remove("isAnimating");
	});
});

function isFirstMonthShown(entries) {
	if (entries[0].isIntersecting) {
		hideBtn(prevBtn);
	} else {
		showBtn(prevBtn);
	}
}

function isLastMonthShown(entries) {
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

function getTranslateX(element) {
	const style = element.style.transform;

	let translateX = style.match(/[\-\+\d\.]+[e]?/g);
	if (translateX)
		translateX = translateX.length > 1 ? translateX.join("") : translateX;
	const translateX_Val = +translateX;

	return translateX_Val;
}

const options = {
	root: document.querySelector(".habit"),
};

const startObserver = new IntersectionObserver(isFirstMonthShown, options);
const endObserver = new IntersectionObserver(isLastMonthShown, options);

startObserver.observe(allMonths[0]);
endObserver.observe(allMonths[11]);

window.addEventListener("resize", () => {
	const visibleMonths = [];

	const resizeOptions = {
		root: document.querySelector(".habit"),
		treshold: 1.0,
	};

	function getVisibleMonths(entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) visibleMonths.push(entry.target);
		});

		const currentGap =
			allMonths[1].getBoundingClientRect().x -
			(allMonths[0].getBoundingClientRect().x +
				allMonths[0].getBoundingClientRect().width);

		const earliestVisibleMonth = visibleMonths[0];

		const earliestMonthIndex = allMonths.indexOf(earliestVisibleMonth);

		const currentMonthWidth =
			earliestVisibleMonth.getBoundingClientRect().width + currentGap;

		allMonths.forEach(month => {
			month.style.transform = `translateX(-${
				earliestMonthIndex * currentMonthWidth
			}px)`;
		});

		allMonths.forEach(month => {
			monthsObserver.unobserve(month);
		});
	}

	const monthsObserver = new IntersectionObserver(
		getVisibleMonths,
		resizeOptions
	);

	allMonths.forEach(month => {
		monthsObserver.observe(month);
	});
});
