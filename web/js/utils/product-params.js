/**
 * Convert query params to Object
 *
 * @returns {Object}
 */
function getSearchParams() {
  const searchParams = window.document.location.search
    .replace("?", "")
    .split("&");

  const searchParamsObj = {};
  searchParams.forEach((searchKey) => {
    const [searchK, searchValue] = searchKey.split("=");
    searchParamsObj[searchK] = searchValue;
  });

  if (searchParams[0] !== "" || searchParams.length > 1) {
    return searchParamsObj;
  }

  return {};
}

/**
 * Parse query params as Object to query params as String.
 *
 * @param {Object} searchParams converted query params
 * @param {Object} ignoreParams params you don't want use
 * @returns {String}
 */
function parseSearchParams(searchParams, ignoreParams = {}) {
  let search = "";
  for (const [key, value] of Object.entries(searchParams)) {
    if (!ignoreParams.hasOwnProperty(key)) {
      search += `${key == "search" ? "q" : key}=${value}&`;
    }
  }
  search = "?" + search;
  return search.substring(0, search.length - 1);
}

export { getSearchParams, parseSearchParams };
