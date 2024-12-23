import { useState, useEffect } from "react";
import DealFeedback from "./util/DealFeedback";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

function WaitingForDeal({
  userId,
  dealPrice,
  dealRequestState,
  onDone, // Callback to notify when the deal process is complete
}) {
  const [isWaiting, setIsWaiting] = useState(dealRequestState);
  const [initialCoins, setInitialCoins] = useState(null); // Coins at the start
  const [isSuccess, setIsSuccess] = useState(null); // null, true, or false

  // Fetch the initial coins on component mount
  useEffect(() => {
    const fetchInitialCoins = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userCoins = userSnap.data().coins || 0;
          setInitialCoins(userCoins);
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        console.error("Error fetching initial coins:", error);
        setInitialCoins(0); // Fallback value if the user is not found
      }
    };

    fetchInitialCoins();
  }, [userId]);

  // Check if the deal has been completed
  useEffect(() => {
    const checkDeal = async () => {
      if (!isWaiting || initialCoins === null) return;

      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) throw new Error("User not found");

        const userCoins = userSnap.data().coins || 0;
        const dealCompleted = userCoins !== initialCoins;

        setIsSuccess(dealCompleted);
        setIsWaiting(false);
        if (onDone) onDone(); // Notify parent that the deal process is complete
      } catch (error) {
        console.error("Error checking deal status:", error);
        setIsSuccess(false); // Consider deal failed if an error occurs
        setIsWaiting(false);
        if (onDone) onDone(); // Notify parent even on failure
      }
    };

    checkDeal();
  }, [isWaiting, initialCoins, userId, onDone]);

  return (
    <div>
      {isWaiting && <div className="waiting-bar">Processing the deal...</div>}
      {isSuccess !== null && (
        <DealFeedback isSuccess={isSuccess} dealPrice={dealPrice} />
      )}
    </div>
  );
}

export default WaitingForDeal;

