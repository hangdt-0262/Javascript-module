import { getProductById } from "../services/product-service.js";
import { getSearchParams } from "../utils/product-params.js";
import createRatingStars from "../components/rating-stars.js";
import { formatPrice } from "../utils/price.js";
import { addToCart, checkExistsInCart, editCart } from "../utils/cart.js";

const searchParams = getSearchParams();
getProductById(searchParams.id).then((product) => {
  const currentBreadcrumbItem = document.querySelector(
    '.breadcrumb-item[aria-current="page"]',
  );
  currentBreadcrumbItem.innerHTML = product.name;

  const productImg = document.querySelector(
    ".product__image.product__image--main img",
  );
  productImg.src = `./assets/images/${product.img}`;
  productImg.alt = product.name;

  const productText = document.querySelector(".product__text");
  const productStars = createRatingStars(product.stars);
  productStars.classList.add("display-11px");
  productText.insertBefore(productStars, productText.childNodes[2]);

  const productTitle = document.querySelector(".product__title");
  productTitle.innerHTML = product.name;

  const productPrice = document.querySelector(".product__price");
  productPrice.childNodes[1].innerHTML = formatPrice(product.price.now);
  productPrice.childNodes[2].innerHTML = formatPrice(product.price.pre);

  const productDescription = document.querySelector(".product__description");
  productDescription.innerHTML = product.description;

  const productTabs = Array.from(
    document.querySelectorAll(".product__tabs .nav-tabs .nav-item .nav-link"),
  );

  const productPanelInfo = document.getElementById("product-panel-info");
  if (product.info) {
    productPanelInfo.innerHTML = product.info;
  } else {
    productPanelInfo.remove();
    productTabs[0].remove();
    productTabs[1].classList.add("active");
  }

  const productPanelComments = document.getElementById(
    "product-panel-comments",
  );
  if (product.comments) {
    productPanelComments.innerHTML = product.comments;
  } else {
    productPanelComments.remove();
    productTabs[1].remove();
    productTabs[2].classList.add("active");
  }

  const productPanelTags = document.getElementById("product-panel-tags");
  if (product.tags) {
    productPanelTags.innerHTML = product.tags;
  } else {
    productPanelTags.remove();
    productTabs[2].remove();
  }
});

function changeProductsAmount() {
  const amountBtns = Array.from(
    document.querySelectorAll(".product__amount-input button"),
  );
  const amountInput = document.querySelector(".product__amount-input input");
  amountBtns[0].addEventListener("click", () => {
    amountInput.value = Number(amountInput.value) + 1;
  });
  amountBtns[1].addEventListener("click", () => {
    const newValue = Number(amountInput.value) - 1;
    amountInput.value = newValue >= 0 ? newValue : amountInput.value;
  });
}

function buyNow() {
  const buyNowBtn = document.querySelector(".product-actions a");
  const amountInput = document.querySelector(".product__amount-input input");
  buyNowBtn.addEventListener("click", () => {
    const productId = searchParams.id;
    const newAmount = amountInput.value;
    getProductById(productId).then((product) => {
      if (!checkExistsInCart(productId)) {
        addToCart(product, newAmount);
      } else {
        editCart(productId, newAmount);
      }
      window.document.location.href = "/basket.html";
    });
  });
}

changeProductsAmount();
buyNow();
