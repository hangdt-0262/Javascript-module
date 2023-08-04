import { ORDER_STEPS } from "../constants/constants.js";

/**
 * Get Cart from localStorage
 * @returns {Object}
 */
export function getCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart;
}

/**
 * Add a product into cart at localStorage.
 *
 * @param {Object} product product information
 * @param {Number} amount product amount
 */
export function addToCart(product, amount) {
  const newProduct = {
    product,
    amount,
    money: product.price.now * amount,
  };
  let cart = getCart();
  if (!cart) {
    cart = {
      orderStepId: {
        doing: 1,
        done: 0,
      },
      products: [],
    };
  }

  cart.products.push(newProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Update amount of product in cart.
 *
 * @param {Number} productId id of product
 * @param {Number} amount product amount
 */
export function editCart(productId, amount) {
  const cart = getCart();
  const itemIndex = cart.products.findIndex(
    (item) => item.product.id == productId,
  );
  if (itemIndex >= 0) {
    if (amount > 0) {
      const newItem = {
        ...cart.products[itemIndex],
        amount,
        money: cart.products[itemIndex].product.price.now * amount,
      };

      cart.products[itemIndex] = newItem;
    } else {
      cart.products.splice(itemIndex, 1);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Check if product exists in cart.
 *
 * @param {Number} id id of product
 * @returns {Boolean}
 */
export function checkExistsInCart(id) {
  const cart = getCart();
  const products = cart?.products;
  const productIndex = products?.findIndex(
    (product) => product.product.id == id,
  );
  if (productIndex >= 0) {
    return true;
  }

  return false;
}

/**
 * Update property of cart.
 * @param {Object} data
 */
export function updateCart(data) {
  const cart = getCart();
  const newCart = { ...cart, ...data };
  localStorage.setItem("cart", JSON.stringify(newCart));
}

/**
 * Calculate bill based on cart.
 * @returns {Object}
 */
export function totalCart() {
  const cart = getCart();
  const moneyTotal =
    cart?.products?.reduce((total, item) => (total += item.money), 0) || 0;
  const vat = (moneyTotal / 100) * 10;
  const pay = moneyTotal + vat;

  return {
    moneyTotal,
    vat,
    pay,
  };
}

/**
 * Delete product from cart.
 * @param {Number} productId id of product
 */
export function deleteFromCart(productId) {
  const cart = getCart();
  const products = cart?.products?.filter(
    (item) => item.product.id != productId,
  );
  cart.products = products;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeCart() {
  localStorage.removeItem("cart");
}

/**
 * Move to another step.
 *
 * @param {Number} stepId id of step you want to go
 * @param {Boolean} isDataSaved if at this step, you can save data
 * @returns {Boolean} if moving step successfully
 */
export function moveToStep(stepId, isDataSaved = true) {
  let success = false;
  const cart = getCart();
  if (cart?.orderStepId?.done != ORDER_STEPS.four) {
    const doneOrderStepId = Number(cart?.orderStepId?.done);
    if (stepId <= doneOrderStepId + 1) {
      cart.orderStepId.doing = stepId;
      success = true;
    }
    if (isDataSaved) {
      if (
        stepId == doneOrderStepId + 2 &&
        cart.orderStepId.doing == doneOrderStepId + 1
      ) {
        cart.orderStepId.done = cart.orderStepId.doing;
        cart.orderStepId.doing = stepId;
        success = true;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return success;
}
