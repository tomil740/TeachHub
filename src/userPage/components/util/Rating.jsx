import { useEffect, useState } from "react";
import CalculateAverageRating from "../../../components/RatingAvg";

function Rating({ user }) {
  const [averageRating, setAverageRating] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const avg = await CalculateAverageRating(user.uid);
        setAverageRating(avg);
      } catch (err) {
        console.error("Error calculating average rating:", err);
        setError("Failed to fetch rating from user");
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchAverageRating();
    }
  }, [user?.uid]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex items-center justify-center gap-2 text-amber-500">
      <i className="fa-solid fa-star md:text-lg"></i>
      <span className="font-bold md:text-lg">
        {loading
          ? "Loading..."
          : !isNaN(averageRating) && averageRating > 0
            ? averageRating?.toFixed(1)
            : "No rating yet"}
      </span>
    </div>
  );
}

export default Rating;
