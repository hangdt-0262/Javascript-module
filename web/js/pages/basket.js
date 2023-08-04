import createDeleteAlert from "../components/delete-alert.js";
import createStepsBar from "../components/steps-bar.js";
import createSuccessToast from "../components/success-toast.js";
import { MESSAGES, ORDER_STEPS } from "../constants/constants.js";
import { getOrderSteps } from "../services/order-service.js";
import {
  deleteFromCart,
  editCart,
  getCart,
  moveToStep,
  removeCart,
  totalCart,
} from "../utils/cart.js";
import nextStep from "../utils/order.js";
import { formatPrice } from "../utils/price.js";

const cart = getCart();

/**
 * Create payment steps bar.
 */
function createPayStepsBar() {
  const payStepsBarContianer = document.querySelector(".basket__steps-bar");
  getOrderSteps().then((steps) => {
    const payStepsBar = createStepsBar(
      steps,
      cart?.orderStepId,
      function (stepId) {
        const previousDoingStep = cart?.orderStepId?.doing;
        const success = moveToStep(stepId, false);
        if (success) {
          if (previousDoingStep <= cart?.orderStepId?.done) {
            nextStep(previousDoingStep);
          }
          window.document.location.reload();
        }
      },
    );
    payStepsBarContianer.append(payStepsBar);
  });
}

/**
 * Add cart to table.
 */
function addToTableBody() {
  const tableBody = document.querySelector(".basket__table tbody");
  const tableRow = document.querySelector(".basket__table tbody tr");
  tableRow.remove();
  const rows = cart?.products?.map((cartItem) => {
    const row = tableRow.cloneNode(true);
    row.classList.remove("d-none");

    const rowImg = row.childNodes[1].querySelector(".basket__img");
    rowImg.src += cartItem.product.img;
    rowImg.alt = cartItem.product.name;

    row.childNodes[3].innerHTML = cartItem.product.name;
    row.childNodes[5].innerHTML = formatPrice(cartItem.product.price.now);

    const rowAmountInput = row.childNodes[7].querySelector(".basket__input");
    rowAmountInput.value = cartItem.amount;
    rowAmountInput.addEventListener("input", (event) => {
      const newValue = event.target.value;
      if (newValue) {
        editCart(cartItem.product.id, newValue);
        window.location.reload();
      }
    });

    row.childNodes[9].innerHTML = formatPrice(cartItem.money);

    const removeBtn = row.childNodes[11].querySelector("a");
    removeBtn.onclick = () => {
      createDeleteAlert({
        modalDesText: MESSAGES.deleteProduct,
        onOkBtn: () => {
          deleteFromCart(cartItem.product.id);
          window.document.location.reload();
        },
      });
    };

    return row;
  });

  if (rows) {
    tableBody.append(...rows);
  }
}

/**
 * Edit total table.
 */
function editTotalTable() {
  const total = totalCart();

  const cells = Array.from(
    document.querySelectorAll(".basket__table.basket__table--bill td"),
  );
  cells[0].innerHTML = formatPrice(total.moneyTotal);
  cells[1].innerHTML = formatPrice(total.vat);
  cells[2].innerHTML = formatPrice(total.pay);
}

/**
 * Handle cancel cart.
 */
function handleCancelCart() {
  const cancelBtn = document.querySelector(".basket__btn.basket__btn--cancel");
  cancelBtn.onclick = () => {
    createDeleteAlert({
      modalDesText: "Bạn có chắc chắn muốn xóa đơn hàng không?",
      onOkBtn: () => {
        removeCart();
        window.document.location.reload();
      },
    });
  };
}

/**
 * Handle Buy now.
 */
function handleBuyContinue() {
  const buyContinueBtn = document.querySelector(
    ".basket__btn.basket__btn--continue",
  );
  if (buyContinueBtn) {
    buyContinueBtn.onclick = () => {
      window.document.location.href = "/grid-products-list.html";
    };
  }
}

/**
 * handle when click next button.
 */
function handleNextBtn() {
  const btns = Array.from(
    document.querySelectorAll(".basket__btn.basket__btn--next"),
  );
  if (btns) {
    if (cart?.products?.length > 0) {
      btns.forEach((btn) => {
        btn.onclick = async (event) => {
          const currentStep = Number(event.target.dataset.step - 1);
          await nextStep(currentStep, () => moveToStep(currentStep + 1));
          window.document.location.reload();
        };
      });
    }
  }
}

/**
 * Handle when click previous button.
 */
function handlePreBtn() {
  const btns = Array.from(
    document.querySelectorAll(".basket__btn.basket__btn--pre"),
  );
  if (btns) {
    btns.forEach((btn) => {
      btn.onclick = (event) => {
        event.preventDefault();
        moveToStep(Number(btn.dataset.step));
        window.document.location.reload();
      };
    });
  }
}

/**
 * Set current order step.
 */
function setBasketStep() {
  const doingOrderStepId = cart?.orderStepId?.doing
    ? cart?.orderStepId?.doing
    : 1;
  const basketSteps = document.querySelectorAll(".basket__step");
  basketSteps.forEach((basketStep) => {
    if (doingOrderStepId == basketStep.dataset.step) {
      basketStep.classList.remove("d-none");
    } else {
      basketStep.classList.add("d-none");
    }
  });
}

/**
 * Set default value of delivery form.
 */
function setDeliveryForm() {
  const deliveryInfo = cart?.deliveryInfo;
  const deliveryForm = document.querySelector("form.basket__delivery");
  for (const key in deliveryInfo) {
    if (Object.hasOwnProperty.call(deliveryInfo, key)) {
      if (typeof deliveryInfo[key] == "boolean") {
        deliveryForm[key].checked = deliveryInfo[key];
      } else {
        deliveryForm[key].value = deliveryInfo[key];
      }
    }
  }
}

/**
 * Set default value of payment form.
 */
function setPaymentMethod() {
  const paymentMethodId = cart?.paymentMethodId;
  const paymentMethodInput = document.querySelector(
    `form.basket__payment-method input[value='${
      paymentMethodId ? paymentMethodId : 1
    }']`,
  );

  paymentMethodInput.checked = true;
}

/**
 * Set bill total to confirm.
 */
function setConfirmPay() {
  const confirmPay = document.querySelector(".basket__pay");
  confirmPay.innerText = formatPrice(cart?.pay || 0);
}

/**
 * Handle when finish payment.
 */
function finishPay() {
  if (cart?.orderStepId?.done == ORDER_STEPS.four) {
    createSuccessToast(MESSAGES.confirmPay);
    removeCart();
    setTimeout(() => {
      window.document.location.reload();
    }, 2400);
  }
}

createPayStepsBar();
addToTableBody();
editTotalTable();
handleCancelCart();
handleBuyContinue();
handleNextBtn();
handlePreBtn();
setBasketStep();
setDeliveryForm();
setPaymentMethod();
setConfirmPay();
finishPay();
