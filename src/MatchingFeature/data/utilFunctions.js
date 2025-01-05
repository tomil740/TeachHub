export const sortSellersByScore = (sellers) => {
  return sellers.sort((a, b) => b.score - a.score); // Sorting from highest to lowest score
};

export const preSortSellers = (sellers, user) => {
  // Filter out sellers who don't match basic criteria
  return sellers.filter((seller) => {
    const hasMatchingService = seller.typeOfService.some((service) =>
      user.typeOfService.includes(service),
    );
    const hasMatchingLanguage = seller.language.some((lang) =>
      user.language.includes(lang),
    );

    return hasMatchingService && hasMatchingLanguage;
  });
};

