import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

/*
  Use a deal will be called from the seller , which means user1(the authnticated user) will get the coins
*/
export function useADeal() {
  const initiateDeal = async (user1Id, user2Id, price) => {
    try {
      const user1Ref = doc(db, "users", user1Id);
      const user2Ref = doc(db, "users", user2Id);

      // Fetch user1 and user2 data
      const user1Snap = await getDoc(user1Ref);
      const user2Snap = await getDoc(user2Ref);

      if (!user1Snap.exists() || !user2Snap.exists()) 
        throw new Error("User not found");

      const user1Coins = user1Snap.data().coins || 0;
      const user2Coins = user2Snap.data().coins || 0;

      if (user1Coins < price) {
        throw new Error("Insufficient coins");
      }

      const user1updatedCoins = Math.round(user1Coins + price);
      const user2updatedCoins = Math.round(user2Coins - price);

      // Update coin balances
      await updateDoc(user1Ref, { coins: user1updatedCoins });
      await updateDoc(user2Ref, { coins: user2updatedCoins });
      
      return true; // Success
    } catch (error) {
      console.error("Deal process failed:", error);
      return false; // Failure
    }
  };

  return { initiateDeal };
}
