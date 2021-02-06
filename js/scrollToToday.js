import { allMonths } from "./DOMRefferences.js";
import {
	sideScrollTo,
	getGapWidth,
	getSingleMonthWidth,
	wouldScrollPastEnd,
} from "./scrollUtils.js";

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

function scrollToToday() {
	const monthToDisplay = allMonths[1];

	const startingTranslateX = calculateTranslateX(monthToDisplay);

	if (wouldScrollPastEnd(startingTranslateX)) {
		scrollToEnd();

		return;
	}

	sideScrollTo(startingTranslateX);
}

export { scrollToToday };
