import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";

export function useFeedback(myId, userIdtoFeadBack) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitFeedback = async ({ rating, comment }) => {
    setLoading(true);
    setError(null);

    const feedbackId = [myId, userIdtoFeadBack].sort().join("-");
    const feedbackRef = doc(db, "Feedback", feedbackId);

    try {
      const docSnap = await getDoc(feedbackRef);

      let feedbackItems = [];
      if (docSnap.exists()) {
        // Update existing feedback document
        feedbackItems = docSnap.data().feedbackItems || [];
      }

      // Create the new feedback item
      const newFeedback = { userId: myId, rating, comment };
      feedbackItems.push(newFeedback);

      // Save back to Firestore
      await setDoc(feedbackRef, { feedbackItems });

      setLoading(false);
      return true; // Success
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Failed to submit feedback. Please try again.");
      setLoading(false);
      return false; // Failure
    }
  };

  return { submitFeedback, loading, error };
}
