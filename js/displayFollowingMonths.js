import {
	isTransitionPlaying,
	disableSideScroll,
	getMonthlistXPosition,
	getMonthlistWidth,
	wouldScrollPastEnd,
	scrollToEnd,
	sideScrollTo,
	enableScrollAfterTransition,
	MONTH_LIST_STARTING_POSITION,
} from "./scrollUtils.js";

function displayFollowingMonths() {
	if (isTransitionPlaying()) return;

	disableSideScroll();

	const monthListCurrentPosition =
		MONTH_LIST_STARTING_POSITION - getMonthlistXPosition();

	const monthListWidth = getMonthlistWidth();

	const requestedTranslateX = monthListCurrentPosition + monthListWidth;

	if (wouldScrollPastEnd(requestedTranslateX)) {
		scrollToEnd();
	} else {
		sideScrollTo(requestedTranslateX);
	}

	enableScrollAfterTransition();
}

export { displayFollowingMonths };
