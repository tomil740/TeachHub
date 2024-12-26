import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

async function getUserNameById (userId)  {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data().name || undefined;
    } else {
      console.log(`User with ID ${userId} does not exist.`);
      return undefined;
    }
  } catch (error) {
    console.log(`Error fetching user name for ID ${userId}:`, error);
    return undefined;
  }
};

export default getUserNameById;
