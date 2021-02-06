import {
	isTransitionPlaying,
	disableSideScroll,
	getMonthlistXPosition,
	getMonthlistWidth,
	wouldScrollPastStart,
	scrollToStart,
	sideScrollTo,
	enableScrollAfterTransition,
	MONTH_LIST_STARTING_POSITION,
} from "./scrollUtils.js";

function displayPreviousMonths() {
	if (isTransitionPlaying()) return;

	disableSideScroll();

	const monthListCurrentPosition = getMonthlistXPosition();

	const monthListWidth = getMonthlistWidth();

	const requestedTranslateXValue =
		monthListCurrentPosition + monthListWidth - MONTH_LIST_STARTING_POSITION;

	if (wouldScrollPastStart(requestedTranslateXValue)) {
		scrollToStart();
	} else {
		sideScrollTo(requestedTranslateXValue);
	}

	enableScrollAfterTransition();
}

export { displayPreviousMonths };
