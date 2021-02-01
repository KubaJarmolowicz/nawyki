"use strict";

const monthList = document.querySelector(".habit__months-list");
const months = Array.from(document.querySelectorAll(".habit__month"));
const prevBtn = document.querySelector(".habit__button--prev");
const nextBtn = document.querySelector(".habit__button--next");

const startingListPosition = months[0].getBoundingClientRect().x;

prevBtn.addEventListener("click", () => {
	if (monthList.classList.contains("isAnimating")) return;

	monthList.classList.add("isAnimating");
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

	monthList.addEventListener("transitionend", () => {
		monthList.classList.remove("isAnimating");
	});
});

nextBtn.addEventListener("click", () => {
	if (monthList.classList.contains("isAnimating")) return;

	monthList.classList.add("isAnimating");

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

const options = {
	root: document.querySelector(".habit"),
};

const startObserver = new IntersectionObserver(isFirstMonthShown, options);
const endObserver = new IntersectionObserver(isLastMonthShown, options);

startObserver.observe(months[0]);
endObserver.observe(months[11]);
