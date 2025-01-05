import { db } from "../../firebase"; // Your Firebase setup
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

// Initialize unread deals state for a user (using userId)
export default async function initalizeUnreadDeals(userId) {
  const unreadRef = collection(db, "userUnreadCounters");
  const unreadDocRef = doc(unreadRef, userId); // Create document reference with userId

  try {
    // Check if the unread deals document exists for the user
    const unreadDocSnap = await getDoc(unreadDocRef);

    if (!unreadDocSnap.exists()) {
      // If the document does not exist, initialize it with default values
      await setDoc(unreadDocRef, {
        unreadDeals: { done: 0, your: 0, buyer: 0 }, // Default unread deal state
      });
      console.log("Unread state initialized successfully!");
    } else {
      console.log("Unread state already exists.");
    }
  } catch (error) {
    console.error("Error initializing unread state:", error);
  }

  return unreadDocRef; // Return the document reference for further use
}
