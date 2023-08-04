import updatePagination from "../components/pagination.js";
import createRatingStars from "../components/rating-stars.js";
import createSidebarList from "../components/sidebar-list.js";
import { PRICE_RANGES } from "../constants/constants.js";
import { getCategories } from "../services/category-service.js";
import { getProducts } from "../services/product-service.js";
import { formatPrice } from "../utils/price.js";
import { getSearchParams, parseSearchParams } from "../utils/product-params.js";

/**
 * Create Product Categories Sidebar.
 */
function createCategoriesSidebarList() {
  const productsCategoriesSidebar = document.querySelector(
    ".products-sidebar__categories",
  );
  getCategories().then(function (categoriesRes) {
    const categories = categoriesRes.map((category) => {
      return {
        value: category.id,
        content: category.name,
        amount: category.products.length,
        queryParam: "categoryId",
      };
    });
    productsCategoriesSidebar.appendChild(
      createSidebarList(categories, "categories-collapse"),
    );
  });
}

/**
 * Create Prices Sidebar.
 */
function createPricesSidebarList() {
  const pricesSidebar = document.querySelector(".products-sidebar__prices");

  const pricesRangesList = PRICE_RANGES.map((pricesRange) => {
    return {
      value: `${pricesRange.from}-${pricesRange.to}`,
      content: `${formatPrice(pricesRange.from)} Đ - ${formatPrice(
        pricesRange.to,
      )} Đ`,
      queryParams: ["price.now_gte", "price.now_lte"],
    };
  });

  pricesSidebar.appendChild(
    createSidebarList(pricesRangesList, "prices-collapse"),
  );
}

/**
 * Update Products Pagination.
 */
function updateProductsPagination() {
  const searchParams = getSearchParams();
  const searchParamsStr = parseSearchParams(searchParams, {
    _limit: true,
    _page: true,
  });
  getProducts(searchParamsStr).then(function (products) {
    const displayNumber = document.querySelector(
      ".list-actions__input #display",
    ).value;
    const total = Math.ceil(products.length / displayNumber);

    updatePagination(total);
  });
}

/**
 * Handle change display select.
 */
function handleChangeDisplayNumber() {
  const displaySelect = document.querySelector(".list-actions__input #display");
  const searchParams = getSearchParams();
  if (searchParams._limit) {
    displaySelect.value = searchParams._limit;
  } else {
    displaySelect.value = 9;
  }
  delete searchParams._page;
  displaySelect.addEventListener("change", () => {
    searchParams._limit = displaySelect.value;
    window.document.location.search = parseSearchParams(searchParams);
  });
}

// Handle change sort by condition
function handleChangeSortCondition() {
  const sortSelect = document.querySelector(".list-actions__input #sort");
  const searchParams = getSearchParams();
  if (searchParams._sort) {
    sortSelect.value = searchParams._sort;
  } else {
    sortSelect.value = "name";
  }
  sortSelect.addEventListener("change", () => {
    searchParams._sort = sortSelect.value;
    switch (sortSelect.value) {
      case "starts":
        searchParams._order = "desc";
        break;

      default:
        searchParams._order = "asc";
        break;
    }
    delete searchParams._page;
    window.document.location.search = parseSearchParams(searchParams);
  });
}

// Handle submit search input
function handleChangeSearchInput() {
  const searchInput = document.querySelector('.header__input[name="search"]');
  const searchParams = getSearchParams();

  if (searchParams.q || searchParams.search) {
    const currentValue = searchParams.q || searchParams.search;
    searchInput.value = currentValue;
  }
  searchInput.addEventListener("input", (event) => {
    document.onkeydown = (e) => {
      if (e.key === "Enter") {
        searchParams.q = event.target.value;
        window.document.location.search = parseSearchParams(searchParams);
      }
    };
  });
}

// Hanlde filter by color
function handleFilterByColor() {
  const productColors = Array.from(
    document.getElementsByClassName("products-sidebar__color"),
  );
  productColors.forEach((productColor) => {
    productColor.addEventListener("click", () => {
      const searchParams = getSearchParams();
      searchParams.colorId = productColor.dataset.value;
      delete searchParams._page;
      window.document.location.search = parseSearchParams(searchParams);
    });
  });
}

// Load Products
function loadProducts() {
  const productsLists = Array.from(
    document.getElementsByClassName("products__list"),
  );

  let searchParams = {
    _limit: 9,
    _sort: "name",
    _page: 1,
  };
  searchParams = { ...searchParams, ...getSearchParams() };
  const searchParamsStr = parseSearchParams(searchParams);

  getProducts(searchParamsStr).then(function (products) {
    const productCard = document.querySelector(".products__list .col");
    productCard.remove();
    const productCards = products.map((product) => {
      const card = productCard.cloneNode(true);
      card.classList.remove("d-none");
      card.onclick = () => {
        location.href = `/product-detail.html?id=${product.id}`;
      };

      const cardImg = card.querySelector(".product-card__top .card-img-top");
      cardImg.src += product.img;
      cardImg.alt = product.name;

      const buyNowBtn = card.querySelector(
        ".product-card__top .product-actions",
      ).childNodes[1];
      buyNowBtn.href = `/product-detail.html?id=${product.id}`;

      const cardTitle = card.querySelector(".product-card__title");
      cardTitle.innerHTML = product.name;

      const cardStars = card.querySelector(".product-card__stars");
      cardStars.append(createRatingStars(product.stars));

      const cardPrices = Array.from(
        card.getElementsByClassName("product-card__price"),
      );
      cardPrices[0].innerHTML = formatPrice(product.price.now);
      cardPrices[1].innerHTML = formatPrice(product.price.pre);

      return card;
    });
    productsLists.forEach((productsList) => {
      productsList.append(...productCards);
    });
  });
}

loadProducts();
createCategoriesSidebarList();
createPricesSidebarList();
updateProductsPagination();

handleChangeDisplayNumber();
handleChangeSortCondition();
handleChangeSearchInput();
handleFilterByColor();
