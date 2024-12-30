import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

async function CalculateAverageRating(userId) {
  try {
    const feedbackCollection = collection(db, "Feedback");
    const feedbackSnapshot = await getDocs(feedbackCollection);

    let sum = 0;
    let counter = 0;

    feedbackSnapshot.docs
      .filter(
        (doc) => doc.id === userId && doc.data().feedbackItems?.length > 0,
      )
      .forEach((feedbackDoc) => {
        const feedbackData = feedbackDoc.data();
        feedbackData.feedbackItems.forEach((item) => {
          sum += item.rating;
          counter++;
        });
      });

    return counter > 0 ? sum / counter : 0;
  } catch (error) {
    console.error("Error calculating average rating:", error);
    throw new Error("Failed to calculate average rating");
  }
}

export default CalculateAverageRating;
