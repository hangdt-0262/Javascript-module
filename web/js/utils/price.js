/**
 * Convert price as Number to price as String with format 'xxx.xxx đ'
 *
 * @param {Number} price price
 * @returns {String}
 */
export function formatPrice(price) {
  const numberFormat = new Intl.NumberFormat("es-ES");
  return numberFormat.format(price) + " đ";
}
