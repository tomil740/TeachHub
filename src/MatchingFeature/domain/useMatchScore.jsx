import { useState, useEffect } from "react";
import  calculateMatchScore  from "../data/calculateMatchScore"; // Import calculateMatchScore function

export default function useMatchScore(user, seller) {
  const [matchScore, setMatchScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user || !seller) {
      setError(true);
      setLoading(false);
      return;
    }

    const calculateScore = () => {
      try {
        const score = calculateMatchScore(user, seller);
        setMatchScore(score);
        setLoading(false);
      } catch (err) {
        console.log("Error calculating match score:", err);
        setError(true);
        setMatchScore(null); // Reset the score on error
        setLoading(false);
      }
    };

    // Delay the calculation slightly to simulate pre-calculation before UI
    const timer = setTimeout(calculateScore, 500);

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, [user, seller]);

  return { matchScore, loading, error };
};