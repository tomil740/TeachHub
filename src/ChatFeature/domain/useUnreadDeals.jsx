import { useState, useEffect } from "react";
import { db } from "../../firebase"; // Your Firebase setup
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import initalizeUnreadDeals from "../data/initalizeUnreadDeals";

// Hook to observe and sync unreadDeals state for a user
export default function useUnreadDeals(userId) {
  const [unreadDeals, setUnreadDeals] = useState({ 
    done: 0,
    your: 0,
    buyer: 0, 
  });
  const [unreadChats, setUnreadChats] = useState(0);
  const [unreadDocId, setUnreadDocId] = useState(null);

  useEffect(() => {
    const fetchUnreadDeals = async () => {
      // Initialize the unread state for the user
      const unreadDocRef = await initalizeUnreadDeals(userId);
      setUnreadDocId(unreadDocRef.id);

      // Subscribe to real-time updates on the unread deals document
      const unsubscribe = onSnapshot(unreadDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setUnreadDeals(docSnap.data().unreadDeals); // Sync the unread deals state
          setUnreadChats(docSnap.data().unreadChats); // Sync the unread deals state
        }
      });

      // Return the unsubscribe function to be cleaned up later
      return unsubscribe;
    };

    // Call fetchUnreadDeals but wait for it to complete the initialization
    fetchUnreadDeals().then((unsubscribe) => {
      // Return unsubscribe to cleanup on unmount
      return () => {
        unsubscribe();
      };
    });
  }, [userId]); // Re-run when userId changes

  // Function to update unread deals state (use in your action handlers)
  const resetUnreadDeals = (keyName) => {
    // Update the state locally
    const newState = {...unreadDeals,
        [keyName]:0, // Dynamically update the field
      }
    setUnreadDeals(newState);

    // Update the document in Firestore with the new unreadDeals state
    if (unreadDocId) {
      const unreadRef = doc(db, "userUnreadCounters", unreadDocId);
      setDoc(unreadRef, { unreadDeals: newState });
    }
  };

  return { unreadDeals, resetUnreadDeals, unreadChats };
}
