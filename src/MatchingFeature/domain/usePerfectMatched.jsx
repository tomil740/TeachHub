import { useState, useEffect } from "react";
import { calculateMatchScore } from "../data/calculateMatchScore";

function usePerfectMatched(loggedUser, userCollection) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortedMatches, setSortedMatches] = useState([]);

  useEffect(() => {
    const processMatching = async () => {
      setLoading(true);
      setError(null);

      try {
        // Step 1: Prepare the user collection for processing
        let collectionToProcess = userCollection;

        // If user collection is too large, apply two-level filtering
        if (userCollection.length > 20) {
          // First, filter by matched 'typeOfService'
          collectionToProcess = userCollection.filter((seller) =>
            seller.typeOfService.some((service) =>
              loggedUser.typeOfService.includes(service),
            ),
          );

          // If the collection is still too large, apply second filter by matched 'language'
          if (collectionToProcess.length > 20) {
            collectionToProcess = collectionToProcess.filter((seller) =>
              seller.language.some((lang) =>
                loggedUser.language.includes(lang),
              ),
            );
          }

          // If no results after filtering, fallback to original collection slice
          if (collectionToProcess.length === 0) {
            collectionToProcess = userCollection.slice(0, 20);
          } else {
            // Ensure the final collection size is within the range of 20
            collectionToProcess = collectionToProcess.slice(0, 20);
          }
        }

        // Step 2: Calculate scores for each seller in the collection
        const scoredMatches = collectionToProcess.map((seller) => {
          const score = calculateMatchScore(loggedUser, seller); // Calculate match score
          return { ...seller, score }; // Add the score to the seller object
        });

        // Step 3: Sort matches by score in descending order
        const sorted = scoredMatches.sort((a, b) => b.score - a.score);
        setSortedMatches(sorted); // Store sorted matches
      } catch (err) {
        setError("An error occurred while processing matches.");
      } finally {
        setLoading(false);
      }
    };

    processMatching();
  }, [loggedUser, userCollection]);

  return { loading, error, sortedMatches };
}

export default usePerfectMatched;
