"use strict";

import { prevBtn, nextBtn, allMonths, monthList } from "./DOMRefferences.js";
import { scrollToStart } from "./view/scrollUtils.js";
import { startObserver, endObserver } from "./view/intersectionObservers.js";
import { scrollToToday } from "./view/scrollToToday.js";
import { displayFollowingMonths } from "./view/displayFollowingMonths.js";
import { displayPreviousMonths } from "./view/displayPreviousMonths.js";

import { appManager } from "./state/appManager.js";

import { showOirginalTemplate } from "./state/stateTemplate.js";

prevBtn.addEventListener("click", displayPreviousMonths);

nextBtn.addEventListener("click", displayFollowingMonths);

startObserver.observe(allMonths[0]);
endObserver.observe(allMonths[11]);

window.addEventListener("resize", scrollToStart);

scrollToToday();

appManager.resetAll();

console.log(appManager.renderCurrentState());

monthList.addEventListener("habitstatechange", event => {
	appManager.updateState(event.detail);
});
