/**
 * Format price in dollars with currency symbol
 * @param {number} dollars - Price in dollars
 * @returns {string} Formatted price string
 */
export const formatPrice = (dollars) => {
  dollars = Number(dollars);
  if (isNaN(dollars)) return "0.00";
  return `$${dollars.toFixed(2)}`;
};
