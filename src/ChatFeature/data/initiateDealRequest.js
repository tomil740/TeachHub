import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

/**
 * Initiates a deal request by setting `dealRequest` to true in the chat document.
 *
 * @param {string} chatId - The ID of the chat where the deal request will be made.
 * @returns {Promise<void>} - Resolves if the request is successful, rejects if an error occurs.
 */
export const initiateDealRequest = async (chatId) => {
  try {
    // Reference to the chat document in the Firestore "chats" collection
    const chatRef = doc(db, "chats", chatId);

    // Update the `dealRequest` field to true
    await updateDoc(chatRef, {
      dealRequest: true,
    });

    console.log("Deal request successfully initiated.");
  } catch (error) {
    console.error("Error initiating deal request:", error);
    throw error; // Propagate the error for further handling if needed
  }
};
