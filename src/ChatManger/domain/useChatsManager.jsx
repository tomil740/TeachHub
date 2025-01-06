import { useEffect, useState } from "react";
import { db } from "../../firebase"; // Your Firebase setup
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

const PAGE_SIZE = 10; // Adjust based on your needs

export default function useChatsManager(userId) {
  const [data, setData] = useState([]); // Chat data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [lastDoc, setLastDoc] = useState(null); // For pagination
  const [hasMore, setHasMore] = useState(true); // Check if more data is available

  useEffect(() => {
    if (!userId) return; // Exit if no user ID is provided

    // Query initial batch of chats
    const fetchChats = async () => {
      setLoading(true);
      setError(null);

      try {
        const chatsRef = collection(db, "chats");
        const chatsQuery = query(
          chatsRef,
          where("userIds", "array-contains", userId),
          orderBy("lastInteraction", "desc"),
          limit(PAGE_SIZE),
        );

        const snapshot = await getDocs(chatsQuery);
        const chats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(chats);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === PAGE_SIZE); // Check if more data exists
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [userId]);

  // Fetch more data for pagination
  const fetchMore = async () => {
    if (!hasMore || !lastDoc) return;

    setLoading(true);

    try {
      const chatsRef = collection(db, "chats");
      const chatsQuery = query(
        chatsRef,
        where("userIds", "array-contains", userId),
        orderBy("lastInteraction", "desc"),
        startAfter(lastDoc),
        limit(PAGE_SIZE),
      );

      const snapshot = await getDocs(chatsQuery);
      const moreChats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData((prevData) => [...prevData, ...moreChats]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Observe changes in the queried chats
  useEffect(() => {
    if (!userId) return;

    const chatsRef = collection(db, "chats");
    const chatsQuery = query(
      chatsRef,
      where("userIds", "array-contains", userId),
      orderBy("lastInteraction", "desc"),
    );

    const unsubscribe = onSnapshot(
      chatsQuery,
      (snapshot) => {
        const updatedChats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(updatedChats); // Update chat data with real-time changes
      },
      (err) => {
        setError(err);
      },
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [userId]);

  return {
    data,
    loading,
    error,
    hasMore,
    fetchMore,
  };
}
