import { useState } from "react";
import { preSortSellers, sortSellersByScore } from "../data/utilFunctions";

function usePerfectMatch(loggedUser, userCollection) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [perfectMatchResults, setPerfectMatchResults] = useState([]);

  const fetchAndMatchSellers = async () => {
    setLoading(true);
    setError(null);

    try {
      let sellersToProcess = userCollection;

      if (userCollection.length > 100) {
        const additionalSellers = userCollection; //await fetchMarketplaceSellers();
        sellersToProcess = [...userCollection, ...additionalSellers];
      }

      let preSortedSellers = preSortSellers(sellersToProcess, loggedUser);
      const sellersWithScores = preSortedSellers.map((seller) => {
        const score = calculateMatchScore(loggedUser, seller);
        return { ...seller, score };
      });

      const sortedSellers = sortSellersByScore(sellersWithScores);
      setPerfectMatchResults(sortedSellers.slice(0, 20));
      setLoading(false);
    } catch (err) {
      setError(
        "An error occurred while fetching and calculating perfect matches",
      );
      setLoading(false);
    }
  };


  return { loading, error, perfectMatchResults, fetchAndMatchSellers };
}

export default usePerfectMatch;
