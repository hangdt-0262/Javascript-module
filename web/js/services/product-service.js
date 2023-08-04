import { API_URL } from "../constants/constants.js";

/**
 * Get all products with query params.
 * 
 * @param {String} searchParamsStr 
 * @returns {Promise}
 */
export function getProducts(searchParamsStr) {
  return new Promise((resolve, reject) => {
    const productsApi = `${API_URL}/products${searchParamsStr}`;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", productsApi, true);
    xhttp.onload = function () {
      if (this.status == 200) {
        const products = JSON.parse(this.responseText);
        resolve(products);
      } else {
        reject("Error");
      }
    };
    xhttp.send();
  });
}

/**
 * Get product by id.
 * 
 * @param {Number} id id of product
 * @returns {Promise}
 */
export function getProductById(id) {
  return new Promise((resolve, reject) => {
    const productApi = `${API_URL}/products?id=${id}`;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", productApi, true);
    xhttp.onload = function () {
      if (this.status == 200) {
        const product = JSON.parse(this.responseText);
        resolve(product[0]);
      } else {
        reject("Error");
      }
    };
    xhttp.send();
  });
}
