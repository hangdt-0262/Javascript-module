import { API_URL } from "../constants/constants.js";

/**
 * Get all steps in ordering process.
 * @returns {Promise}
 */
export function getOrderSteps() {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `${API_URL}/orderSteps`);
    xhttp.send();
    xhttp.onload = function () {
      if (this.status == 200) {
        resolve(JSON.parse(this.responseText));
      } else {
        reject(this.responseText);
      }
    };
  });
}

/**
 * Create new a order.
 * @param {String} data
 * @returns {Promist}
 */
export async function createOrder(data) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `${API_URL}/orders`, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(data);
    xhttp.onload = function () {
      if (this.status == 201) {
        resolve(true);
      } else {
        reject(false);
      }
    };
  });
}
