import { db } from "../../firebase"; // Your Firebase setup
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";
import initializeUnReadState from "./initalizeUnreadDeals"; // Ensure correct import
import { useSnackbar } from '../../../globalNotification/useSnackbar';

async function updateUnreadStateById({
  userId,
  keyIncrement,
  key2,
  triggerSnackbar,
}) {

  // Ensure the unread state is initialized for the user
  await initializeUnReadState(userId);

  try {
    // Reference the Firestore document
    const docRef = doc(db, "userUnreadCounters", userId);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      console.log("No document found, initializing...");
      return;
    }

    const currentData = docSnapshot.data()?.unreadDeals || {};

    // Build the update object dynamically
    const updateData = {
      [`unreadDeals.${keyIncrement}`]: increment(1), // Increment keyIncrement inside unreadDeals
    };

    // Trigger the snackbar message only if keyIncrement is valid
    if (keyIncrement && triggerSnackbar) {
      const snackbarMessage = getSnackbarMessageData(keyIncrement);

      if (snackbarMessage) {
        triggerSnackbar(snackbarMessage);
      }
    }

    if (key2 != null && key2 != undefined) {
      const currentKey2Value = currentData[key2] || 0;
      // Ensure key2 doesn't go below 0
      if (currentKey2Value > 0) {
        updateData[`unreadDeals.${key2}`] = increment(-1); // Decrement key2 inside unreadDeals
      }
    }

    // Apply the updates atomically to the existing unreadDeals object
    await updateDoc(docRef, updateData);

    console.log("Unread state updated successfully!");
  } catch (error) {
    console.error("Error updating unread state:", error);
  }
}

// Helper function to map keyIncrement to the correct snackbar message
const getSnackbarMessageData = (keyIncrement) => {
  switch (keyIncrement) {
    case "done":
      return {
        mesType: "done", // Type for "deal done" event
      };
    case "your":
      return {
        mesType: "your", // Type for "your request processed" event
      };
    case "buyer":
      return {
        mesType: "buyer", // Type for "buyer request" event
      };
    case "regularChatMes":
      return {
        mesType: "regularChatMes", // Type for "new message" event
      };
    default:
      return null; // No valid type, no message triggered
  }
};

export default updateUnreadStateById;

