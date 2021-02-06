"use strict";

import { prevBtn, nextBtn, allMonths } from "./DOMRefferences.js";
import { scrollToStart } from "./scrollUtils.js";
import { startObserver, endObserver } from "./intersectionObservers.js";
import { scrollToToday } from "./scrollToToday.js";
import { displayFollowingMonths } from "./displayFollowingMonths.js";
import { displayPreviousMonths } from "./displayPreviousMonths.js";

prevBtn.addEventListener("click", displayPreviousMonths);

nextBtn.addEventListener("click", displayFollowingMonths);

startObserver.observe(allMonths[0]);
endObserver.observe(allMonths[11]);

window.addEventListener("resize", scrollToStart);

scrollToToday();
