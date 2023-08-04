/**
 * Create Step Item.
 *
 * @param {Object} step step information
 * @param {String} type type of item
 * @param {Function} onClickStepItem function to hanlde when click item
 * @returns {Node}
 */
function createStepItem(step, type = "default", onClickStepItem) {
  const stepItem = document.createElement("div");
  stepItem.setAttribute("data-value", step.id);
  stepItem.classList.add("d-flex", "flex-column", "align-items-center");

  const stepPin = document.createElement("button");
  stepPin.classList.add(
    "steps-bar__item",
    "rounded-circle",
    "d-flex",
    "display-20px",
    "justify-content-center",
    "align-items-center",
    "btn",
  );
  stepPin.innerHTML = step.id;
  switch (type) {
    case "doing":
      stepPin.classList.add("btn-outline-green-sheen");
      break;
    case "done":
      stepPin.classList.add("btn-green-sheen", "text-white");
      stepPin.innerHTML = '<i class="fas fa-check"></i>';
      break;

    default:
      stepPin.classList.add("btn-outline-chinese-white", "border-3");
      break;
  }

  const stepText = document.createElement("span");
  stepText.innerHTML = step.content;

  stepItem.append(stepPin, stepText);
  stepItem.onclick = () => onClickStepItem(step.id);

  return stepItem;
}

/**
 *
 * @param {Array} steps array of steps
 * @param {Object} stepStatuses status of steps
 * @param {Function} onClickStepItem function to hanlde when click item
 * @returns {Node}
 */
export default function createStepsBar(steps, stepStatuses, onClickStepItem) {
  const stepsBar = document.createElement("div");
  stepsBar.classList.add(
    "steps-bar",
    "d-flex",
    "justify-content-between",
    "w-100",
  );

  const stepItems = steps.map((step) => {
    let stepItem = createStepItem(step, "", onClickStepItem);

    if (stepStatuses) {
      if (step.id <= stepStatuses.done) {
        stepItem = createStepItem(step, "done", onClickStepItem);
      } else if (step.id == stepStatuses.doing) {
        stepItem = createStepItem(step, "doing", onClickStepItem);
      }
    } else {
      if (step.id == 1) {
        stepItem = createStepItem(step, "doing", onClickStepItem);
      }
    }

    return stepItem;
  });

  stepsBar.append(...stepItems);

  return stepsBar;
}
