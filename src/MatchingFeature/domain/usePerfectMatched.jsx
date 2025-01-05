import { useState, useEffect } from "react";
import { db } from "../../firebase"; // Ensure correct path to Firebase config
import { collection, getDocs } from "firebase/firestore";
import { calculateMatchScore } from "../data/calculateMatchScore";

import {
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";


function usePerfectMatched(loggedUser) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortedMatches, setSortedMatches] = useState([]);

  useEffect(() => {
    const processMatching = async () => {
      setLoading(true);
      setError(null);

      try {
        // Step 1: Fetch all user data from Firestore
        const userCollectionRef = collection(db, "users");
        const querySnapshot = await getDocs(userCollectionRef);

        const userCollection = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Step 2: Filter the collection if too large
        let collectionToProcess = userCollection;

        if (userCollection.length > 20) {
          // Filter by matched 'typeOfService'
          collectionToProcess = userCollection.filter((seller) =>
            seller.typeOfService?.some((service) =>
              loggedUser.typeOfService.includes(service),
            ),
          );

          if (collectionToProcess.length > 20) {
            // Filter by matched 'language'
            collectionToProcess = collectionToProcess.filter((seller) =>
              seller.language?.some((lang) =>
                loggedUser.language.includes(lang),
              ),
            );
          }

          if (collectionToProcess.length === 0) {
            collectionToProcess = userCollection.slice(0, 20);
          } else {
            collectionToProcess = collectionToProcess.slice(0, 20);
          }
        }

        // Step 3: Calculate scores and sort
        const scoredMatches = collectionToProcess.map((seller) => {
          const score = calculateMatchScore(loggedUser, seller);
          return { ...seller, score };
        });

        const sorted = scoredMatches.sort((a, b) => b.score - a.score);
        setSortedMatches(sorted);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An error occurred while processing matches.");
      } finally {
        setLoading(false);
      }
    };

    processMatching();
  }, [loggedUser]);

  return { loading, error, sortedMatches };
}

export default usePerfectMatched;
