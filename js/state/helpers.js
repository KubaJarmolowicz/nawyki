function isActive(element) {
	return element.classList.contains("habit__day--isGreen");
}

function makeActive(element) {
	element.classList.remove("habit__day--isRed");
	element.classList.add("habit__day--isGreen");
}

function makeInactive(element) {
	element.classList.remove("habit__day--isGreen");
	element.classList.add("habit__day--isRed");
}

export { isActive, makeActive, makeInactive };
