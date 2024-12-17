import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export async function logUsers() {
  try {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);
    const usersList = snapshot.docs.map((doc) => doc.data());

    console.log("Users:", usersList);
  } catch (error) {
    console.error("Error retrieving users:", error);
  }
}
