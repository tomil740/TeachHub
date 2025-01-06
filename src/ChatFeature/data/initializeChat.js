import { db } from "../../firebase"; // Your Firebase setup
import {
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export default async function initializeChat(user1Id, user2Id) {
  const chatId = [user1Id, user2Id].sort().join("-"); // Predictable chat ID

  const chatRef = collection(db, "chats");
  const chatDocRef = doc(chatRef, chatId); // Create document reference with chatId

  try {
    // Fetch the document to check if it exists
    const chatDocSnap = await getDoc(chatDocRef);

    if (!chatDocSnap.exists()) {
      // If the document does not exist, initialize it
      await setDoc(chatDocRef, {
        userIds: [user1Id, user2Id], // Array of participants
        unreadCounts: {
          [user1Id]: 0, // Initial read state for user1
          [user2Id]: 0, // Initial read state for user2
        },
        lastInteraction: serverTimestamp(), // Timestamp for the last interaction
        messages: [], // Initialize with an empty messages array
      });
      console.log("Chat initialized successfully!");
    } else {
      console.log("Chat already exists.");
    }
  } catch (error) {
    console.error("Error initializing chat:", error);
  }

  return chatId; // Return the chat ID for use in other operations
}
