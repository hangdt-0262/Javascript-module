import { ORDER_STEPS } from "../constants/constants.js";
import { createOrder } from "../services/order-service.js";
import { getCart, totalCart, updateCart } from "./cart.js";

export default async function nextStep(currentStep, moveToStep) {
  const cart = getCart();
  switch (currentStep) {
    case ORDER_STEPS.one:
      const total = totalCart(cart);
      updateCart(total);
      moveToStep();
      break;
    case ORDER_STEPS.two:
      const deliveryForm = document.querySelector("form.basket__delivery");
      const deliveryInfo = {
        fullname: deliveryForm.fullname.value,
        phonenumber: deliveryForm.phonenumber.value,
        email: deliveryForm.email.value,
        deliveryAddress: deliveryForm["deliveryAddress"].value,
        note: deliveryForm.note.value,
        callBeforeDelivery: deliveryForm["callBeforeDelivery"].checked,
      };
      updateCart({ deliveryInfo });
      moveToStep();
      break;
    case ORDER_STEPS.three:
      const paymentMethodForm = document.querySelector(
        "form.basket__payment-method",
      );
      const paymentMethod = {
        paymentMethodId: paymentMethodForm.paymentMethod.value,
      };
      updateCart(paymentMethod);
      moveToStep();
      break;
    default:
      const cartData = {
        products: cart?.products?.map((product) => {
          return {
            productId: product.product.id,
            price: product.product.price.now,
            amount: product.amount,
            money: product.money,
          };
        }),
        moneyTotal: cart.moneyTotal,
        vat: cart.vat,
        pay: cart.pay,
        deliveryInfo: cart.deliveryInfo,
        paymentMethodId: cart.paymentMethodId,
      };
      const response = await createOrder(JSON.stringify(cartData));
      if (response) {
        moveToStep();
      }
      break;
  }
}
