export default function calculateMatchScore(user, seller) {
  let score = 0;

  // Type of Service Matching
  if (!user.typeOfService || !seller.typeOfService) {
    console.log("Type of Service is missing for user or seller");
  } else {
    const matchedServices = seller.typeOfService.filter((service) =>
      user.typeOfService.includes(service),
    );
    if (matchedServices.length > 0) {
      score += Math.min(matchedServices.length, 3) * 50; // Adjust weights for each match
      if (matchedServices.length > 1) score -= 20; // Reduce weight progressively
    }
  }

  // Experience Matching
  if (user.experience === undefined || seller.experience === undefined) {
    console.log("Experience is missing for user or seller");
  } else {
    const experienceDiff = Math.abs(user.experience - seller.experience);
    if (experienceDiff <= 2) {
      score += 20;
    } else if (experienceDiff <= 5) {
      score += 10;
    }
  }

  // Religion Diversity
  if (user.religion === undefined || seller.religion === undefined) {
    console.log("Religion is missing for user or seller");
  } else {
    if (user.religion !== seller.religion) {
      score += 10; // Reward diversity
    }
  }

  // Age Proximity
  if (!user.dob || !seller.dob) {
    console.log("Date of Birth is missing for user or seller");
  } else {
    const userAge = new Date().getFullYear() - new Date(user.dob).getFullYear();
    const sellerAge =
      new Date().getFullYear() - new Date(seller.dob).getFullYear();
    const ageDiff = Math.abs(userAge - sellerAge);
    if (ageDiff <= 5) {
      score += 10;
    } else if (ageDiff <= 10) {
      score += 5;
    }
  }

  // Rating
  if (seller.rating === undefined) {
    console.log("Rating is missing for seller");
  } else {
    if (seller.rating >= 4) {
      score += 10;
    }
  }

  return score;
}
