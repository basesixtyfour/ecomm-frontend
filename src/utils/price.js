/**
 * Convert paisa to rupees for display
 * @param {number} paisa - Price in paisa
 * @returns {number} Price in rupees
 */
export const paisaToRupees = (paisa) => {
  if (typeof paisa !== 'number' || isNaN(paisa)) return 0;
  return paisa / 100;
};

/**
 * Format price in rupees with currency symbol
 * @param {number} paisa - Price in paisa
 * @returns {string} Formatted price string
 */
export const formatPrice = (paisa) => {
  const rupees = paisaToRupees(paisa);
  return `₹${rupees.toFixed(2)}`;
};

/**
 * Format price in rupees with currency symbol and locale formatting
 * @param {number} paisa - Price in paisa
 * @returns {string} Formatted price string with locale formatting
 */
export const formatPriceWithLocale = (paisa) => {
  const rupees = paisaToRupees(paisa);
  return `₹${rupees.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
