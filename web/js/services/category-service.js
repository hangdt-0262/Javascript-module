import { API_URL } from "../constants/constants.js";

/**
 * Get all product categories.
 * @returns {Promise}
 */
export function getCategories() {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      const categories = JSON.parse(this.responseText);
      if (this.status == 200) {
        resolve(categories);
      } else {
        reject("Error");
      }
    };

    xhttp.open(
      "GET",
      `${API_URL}/categories?_embed=products`,
      true,
    );
    xhttp.send();
  });
}
