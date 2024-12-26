import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

const ReviewForCard = ({ userId }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchFeedbackAndUserData = async () => {
      try {
        const feedbackCollection = collection(db, "Feedback");
        const feedbackSnapshot = await getDocs(feedbackCollection);
        const processedFeedback = await Promise.all(
          feedbackSnapshot.docs
            .filter(
              (doc) =>
                doc.id === userId && doc.data().feedbackItems?.length > 0,
            )
            .flatMap((feedbackDoc) => {
              const feedbackData = feedbackDoc.data();
              return feedbackData.feedbackItems.map(async (item) => {
                const userDocRef = doc(db, "users", item.userId);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) return null;

                const userData = userDoc.data();
                return {
                  id: `${feedbackDoc.id}-${item.userId}`,
                  comment: item.comment,
                  rating: item.rating,
                  userName: userData.name,
                  userImage: userData.imgUrl,
                };
              });
            }),
        );

        const validFeedback = processedFeedback.filter(
          (feedback) => feedback !== null,
        );
        setFeedbackData(validFeedback);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFeedbackAndUserData();
    }
  }, [userId]);

  // Rest of the component remains the same
  if (loading)
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-gray-500">Loading reviews...</div>
      </div>
    );
  if (error)
    return (
      <div className="rounded-lg border border-red-200 p-4 text-red-600">
        {error}
      </div>
    );

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      {feedbackData.length > 0 ? (
        feedbackData.map((feedback) => (
          <div
            key={feedback.id}
            className="mb-4 rounded-lg bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-3">
              {feedback.userImage ? (
                <img
                  src={feedback.userImage}
                  alt={`${feedback.userName}'s profile`}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                  <span className="text-sm text-gray-500">
                    {feedback.userName?.charAt(0) || "?"}
                  </span>
                </div>
              )}
              <h4 className="font-medium text-gray-900">{feedback.userName}</h4>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-lg ${index < feedback.rating ? "text-amber-500" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {feedback.rating}/5
                </span>
              </div>

              {feedback.comment && (
                <p className="text-gray-700">{feedback.comment}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          No reviews available yet.
        </div>
      )}
    </div>
  );
};

export default ReviewForCard;
