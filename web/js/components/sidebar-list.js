import { getSearchParams, parseSearchParams } from "../utils/product-params.js";

/**
 * Create Sidebar Item.
 *
 * @param {Object} param sidebar's item information
 * @returns
 */
function createSidebarItem({
  value,
  content,
  amount,
  queryParam,
  queryParams,
}) {
  const sidebarItem = document.createElement("li");
  sidebarItem.classList.add(
    "list-group-item",
    "display-12px",
    "text-taupe-gray",
    "d-flex",
    "align-items-baseline",
  );
  sidebarItem.dataset.value = value;

  sidebarItem.innerHTML =
    '<i class="fa-solid fa-angle-right display-10px"></i>';

  const sidebarItemText = document.createElement("span");
  sidebarItemText.innerHTML = `<span>&nbsp; ${content}</span> ${
    amount ? `<span>&nbsp; &lpar; ${amount} &rpar;</span>` : ""
  }`;
  const searchParams = getSearchParams();
  let isSelected = false;
  if (queryParam) {
    if (searchParams[queryParam]) {
      if (searchParams[queryParam] == value) {
        isSelected = true;
      }
    }
  }
  if (queryParams) {
    const valueArr = value.split("-");
    for (let index = 0; index < queryParams.length; index++) {
      if (searchParams[queryParams[index]] == valueArr[index]) {
        isSelected = true;
      } else {
        isSelected = false;
      }
    }
  }
  if (isSelected) {
    sidebarItemText.classList.add("fw-bold", "text-shiny-shamrock");
  }
  sidebarItem.appendChild(sidebarItemText);

  // Handle event
  sidebarItem.addEventListener("click", () => {
    if (queryParam) searchParams[queryParam] = value;
    if (queryParams) {
      const valueArr = value.split("-");
      for (let index = 0; index < valueArr.length; index++) {
        searchParams[queryParams[index]] = valueArr[index];
      }
    }
    delete searchParams._page;
    window.document.location.search = parseSearchParams(searchParams);
  });

  return sidebarItem;
}

/**
 * Create Sidebar List.
 *
 * @param {Array} list
 * @param {Number} id id of sidebar list
 * @returns {Node}
 */
export default function createSidebarList(list, id) {
  const sidebarListContainer = document.createElement("div");
  sidebarListContainer.classList.add("sidebar-list");
  sidebarListContainer.id = id;
  const sidebarList = document.createElement("ul");
  sidebarList.classList.add("list-group", "list-group-flush");
  list.forEach((item) => {
    sidebarList.appendChild(createSidebarItem(item));
  });
  sidebarListContainer.appendChild(sidebarList);
  return sidebarListContainer;
}
