import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

export async function makeDealRequestObj(buyerUserId, sellerUserId, dealPrice) {
  try {
    const dealsRef = collection(db, "deals");

    // Check if a deal already exists between the buyer and seller
    const q = query(
      dealsRef,
      where("buyerUserId", "==", buyerUserId),
      where("sellerUserId", "==", sellerUserId),
      where("isPending", "==", true),
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.error(
        "A pending deal request already exists between these users.",
      );
      return {
        success: false,
        message:
          "A deal request is already in progress; only one deal can be processed at a time, specifically for the seller.",
      };
    }

    // Create a new deal request
    const newDeal = {
      buyerUserId,
      sellerUserId,
      dealPrice,
      isPending: true,
      isAllDone: false,
      createdAt: new Date().toISOString(),
    };

    await addDoc(dealsRef, newDeal);
    console.log("Deal request successfully created.");
    return { success: true, message: "Deal request created successfully." };
  } catch (error) {
    console.error("Error creating deal request:", error);
    return { success: false, message: error.message };
  }
};
