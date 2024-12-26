/**
 * Calculates the updated service price based on the user's and profile's religion.
 * Applies a cultural diversity discount if the religions are different.
 *
 * @param {string} userReligion - The authenticated user's religion.
 * @param {string} profileReligion - The profile user's religion.
 * @param {number} basePrice - The base price of the service.
 * @returns {[number, string]} An array containing the updated price and a message.
 */
function calculateServicePrice(userReligion, profileReligion, basePrice) {
  if (userReligion !== profileReligion) {
    const discountedPrice = basePrice * 0.9; // Apply a 10% discount
    const message = "You are entitled to a cultural diversity discount";
    return [discountedPrice, message];
  }

  const message = "There is no matched discount.";
  return [basePrice, message];
}

export default calculateServicePrice;
