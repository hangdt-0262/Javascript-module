import { getSearchParams, parseSearchParams } from "../utils/product-params.js";

/**
 * Update pagination.
 * @param {Number} total
 */
export default function updatePagination(total) {
  const searchParams = getSearchParams();
  const pagination = document.querySelector(".pagination");
  if (total < 2) {
    pagination.remove();
  }

  const pageItems = Array.from(pagination.getElementsByClassName("page-item"));

  const prePageLink = pageItems[0].querySelector(".page-link");
  prePageLink.href = `?${parseSearchParams(searchParams, {
    _page: true,
  })}&_page=${
    searchParams._page - 1 > 0 ? searchParams._page - 1 : searchParams._page
  }`;

  const pageItem = pageItems[1];
  pageItem.remove();

  const nextPageLink = pageItems[2].querySelector(".page-link");
  nextPageLink.href = `?${parseSearchParams(getSearchParams(), {
    _page: true,
  })}&_page=${
    Number(searchParams._page) + 1 <= total
      ? Number(searchParams._page) + 1
      : searchParams._page
  }`;

  let pageIndex = 1;
  while (pageIndex <= total) {
    const clonedPageItem = pageItem.cloneNode(true);
    const pageLink = clonedPageItem.querySelector(".page-link");
    const currentParamsStr = parseSearchParams(searchParams, {
      _page: true,
    });
    pageLink.href = `?${
      currentParamsStr ? currentParamsStr + "&" : ""
    }_page=${pageIndex}`;
    pageLink.innerHTML = pageIndex;
    if (!searchParams._page && pageIndex === 1) {
      pageLink.classList.add("bg-md-sea-green", "text-white");
      clonedPageItem.classList.add("active");
    } else if (searchParams._page == pageIndex) {
      pageLink.classList.add("bg-md-sea-green", "text-white");
      clonedPageItem.classList.add("active");
    }
    pageIndex++;
    pagination.insertBefore(clonedPageItem, pageItems[2]);
  }
}
