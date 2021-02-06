import { nextBtn, prevBtn } from "../DOMRefferences.js";

function showBtn(btn) {
	btn.style.display = "block";
}

function hideBtn(btn) {
	btn.style.display = "none";
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

const options = {
	root: document.querySelector(".habit"),
};

const startObserver = new IntersectionObserver(adjustToStartView, options);
const endObserver = new IntersectionObserver(adjustToEndView, options);

export { startObserver, endObserver };
